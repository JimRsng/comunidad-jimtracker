export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, z.object({
    name: z.string()
  }).parse);

  const twitchId = await getTwitchIdByLogin(event, params.name);

  const riotAccountLogs = await db.select().from(tables.riotAccountLogs).where(
    eq(tables.riotAccountLogs.twitchId, twitchId)
  ).all();

  return riotAccountLogs;
});
