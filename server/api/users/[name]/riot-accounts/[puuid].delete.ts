export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  const params = await getValidatedRouterParams(event, z.object({
    name: z.string(),
    puuid: z.string()
  }).parse);

  if (user.twitchLogin !== params.name) {
    throw createError({ status: ErrorCode.FORBIDDEN, message: "No tienes permiso para realizar esta acción" });
  }

  const result = await db.delete(tables.riotAccounts).where(and(
    eq(tables.riotAccounts.twitchId, user.twitchId),
    eq(tables.riotAccounts.puuid, params.puuid)
  )).run();

  if (result.rowsAffected === 0) {
    throw createError({ status: ErrorCode.NOT_FOUND, message: "Cuenta de Riot no encontrada" });
  }
});
