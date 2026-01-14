export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  const params = await getValidatedRouterParams(event, z.object({
    name: z.string()
  }).parse);

  const body = await readValidatedBody(event, z.object({
    // country: z.string().nullable(),
    bio: z.string().nullable()
  }).parse);

  if (params.name !== user.twitchLogin) {
    throw createError({ status: ErrorCode.FORBIDDEN, message: "No tienes permiso para realizar esta acción" });
  }

  const update = await db.update(tables.users).set({
    // country: body.country || null,
    bio: body.bio || null,
    updatedAt: unixepoch({ mode: "ms" })
  }).where(eq(tables.users.twitchLogin, params.name)).returning({
    // country: tables.users.country,
    bio: tables.users.bio
  }).get();

  return update;
});
