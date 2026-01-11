export default defineOAuthTwitchEventHandler({
  config: {
    scope: ["moderator:read:followers"]
  },
  async onSuccess (event, result: { user: TwitchUser, tokens: any }) {
    const twitch = result.user;

    await db.insert(tables.channelModerators).values({
      twitchId: twitch.id,
      accessToken: result.tokens.access_token,
      refreshToken: result.tokens.refresh_token,
      expiresIn: result.tokens.expires_in
    }).onConflictDoUpdate({
      target: tables.channelModerators.twitchId,
      set: {
        accessToken: result.tokens.access_token,
        refreshToken: result.tokens.refresh_token,
        expiresIn: result.tokens.expiresIn,
        updatedAt: unixepoch({ mode: "ms" })
      }
    }).returning().get();

    return sendRedirect(event, "/");
  }
});
