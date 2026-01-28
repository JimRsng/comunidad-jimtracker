import { AppTokenAuthProvider } from "@twurple/auth";
import { ApiClient } from "@twurple/api";

export default defineTask({
  meta: {
    name: "updateTwitchData",
    description: "Update twitch accounts data"
  },
  async run (): Promise<{
    result?: any[];
    updated?: number;
    unchanged?: number;
  }> {
    const config = useRuntimeConfig();
    const authProvider = new AppTokenAuthProvider(config.oauth.twitch.clientId, config.oauth.twitch.clientSecret);
    const twitch = new ApiClient({ authProvider });
    const data = await db.select({
      twitchId: tables.users.twitchId,
      twitchLogin: tables.users.twitchLogin,
      twitchDisplay: tables.users.twitchDisplay,
      twitchProfileImage: tables.users.twitchProfileImage
    }).from(tables.users).orderBy(asc(tables.users.updatedAt)).limit(100).all();
    const userIds = data.map(d => d.twitchId);
    const newUsersData = await twitch.users.getUsersByIds(userIds);

    const promisesWithChanges = [];
    const promisesWithNoChanges = [];
    const processedIds = new Set<string>();

    for (const userData of newUsersData) {
      processedIds.add(userData.id);
      const user = data.find(d => d.twitchId === userData.id);
      if (user?.twitchDisplay !== userData.displayName || user?.twitchLogin !== userData.name || user?.twitchProfileImage !== userData.profilePictureUrl) {
        const updateQuery = db.update(tables.users).set({
          twitchLogin: userData.name,
          twitchDisplay: userData.displayName,
          twitchProfileImage: userData.profilePictureUrl,
          updatedAt: unixepoch({ mode: "ms" })
        }).where(and(
          eq(tables.users.twitchId, userData.id)
        ));

        const updatePromise = import.meta.dev ? updateQuery.returning({
          twitchId: tables.users.twitchId,
          twitchLogin: tables.users.twitchLogin,
          twitchDisplay: tables.users.twitchDisplay,
          twitchProfileImage: tables.users.twitchProfileImage
        }).get() : updateQuery.run();

        promisesWithChanges.push(updatePromise);
      }
      else {
        const touchQuery = db.update(tables.users).set({
          updatedAt: unixepoch({ mode: "ms" })
        }).where(and(
          eq(tables.users.twitchId, userData.id)
        ));

        const updatePromise = import.meta.dev ? touchQuery.returning({
          twitchId: tables.users.twitchId,
          twitchLogin: tables.users.twitchLogin,
          twitchDisplay: tables.users.twitchDisplay,
          twitchProfileImage: tables.users.twitchProfileImage
        }).get() : touchQuery.run();

        promisesWithNoChanges.push(updatePromise);
      }
    }

    if (!promisesWithChanges.length && !promisesWithNoChanges.length) return { result: [] };

    const [changedData, noChangesData] = await Promise.all([
      Promise.all(promisesWithChanges),
      Promise.all(promisesWithNoChanges)
    ]);

    return {
      result: changedData,
      updated: changedData.length,
      unchanged: noChangesData.length
    };
  }
});
