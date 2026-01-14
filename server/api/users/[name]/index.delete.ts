export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  const params = await getValidatedRouterParams(event, z.object({
    name: z.string()
  }).parse);

  if (params.name !== user.twitchLogin) {
    throw createError({ status: ErrorCode.FORBIDDEN, message: "No tienes permiso para realizar esta acción" });
  }

  await db.delete(tables.users).where(eq(tables.users.twitchLogin, params.name)).run();
});
