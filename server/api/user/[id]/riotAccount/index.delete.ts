export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const { puuid } = getQuery<{ puuid: string }>(event);
  const deleteResult = await db.delete(tables.riotAccounts).where(and(
    eq(tables.riotAccounts.twitchId, id),
    eq(tables.riotAccounts.puuid, puuid)
  )).returning().get();
  if (!deleteResult) {
    throw createError({ statusCode: 404, message: "Cuenta de Riot no encontrada" });
  }
  return deleteResult;
});
