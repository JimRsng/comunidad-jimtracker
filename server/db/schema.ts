import { index, integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { unixepoch } from "../utils/db";
import type { Regions } from "twisted/dist/constants";

export const users = sqliteTable("users", {
  twitchId: text().primaryKey(),
  twitchLogin: text().notNull(),
  twitchDisplay: text().notNull(),
  twitchProfileImage: text(),
  twitchCumulativeMonths: integer(),
  twitchSubExpiration: integer(),
  country: text(),
  bio: text(),
  badges: text().$type<string[]>(),
  createdAt: integer().notNull().default(unixepoch({ mode: "ms" })),
  updatedAt: integer().notNull().default(unixepoch({ mode: "ms" }))
}, table => [
  index("users_twitch_login_idx").on(table.twitchLogin)
]);

export const riotAccounts = sqliteTable("riot_accounts", {
  puuid: text().primaryKey(),
  twitchId: text().notNull().references(() => users.twitchId, { onDelete: "cascade" }),
  gameName: text().notNull(),
  tagLine: text().notNull(),
  region: text().notNull().$type<Regions>(),
  tier: text(),
  division: text(),
  lp: integer(),
  wins: integer(),
  losses: integer(),
  profileIcon: integer(),
  verified: integer({ mode: "boolean" }).notNull().default(false),
  role1: text(),
  role2: text(),
  createdAt: integer().notNull().default(unixepoch({ mode: "ms" })),
  updatedAt: integer().notNull().default(unixepoch({ mode: "ms" }))
});

export const channelModerators = sqliteTable("channel_moderators", {
  twitchId: text().primaryKey(),
  accessToken: text().notNull(),
  refreshToken: text().notNull(),
  expiresIn: integer().notNull(),
  createdAt: integer().notNull().default(unixepoch({ mode: "ms" })),
  updatedAt: integer().notNull().default(unixepoch({ mode: "ms" }))
});

export const riotAccountLogs = sqliteTable("riot_account_logs", {
  id: integer().primaryKey(),
  puuid: text().notNull().references(() => riotAccounts.puuid, { onDelete: "cascade" }),
  twitchId: text().notNull().references(() => users.twitchId, { onDelete: "cascade" }),
  description: text(),
  data: text({ mode: "json" }).$type<JimRiotAccountLogData>().notNull(),
  createdAt: integer().notNull().default(unixepoch({ mode: "ms" })),
  updatedAt: integer().notNull().default(unixepoch({ mode: "ms" }))
});

export const logReactions = sqliteTable("log_reactions", {
  id: integer().primaryKey(),
  logId: integer().notNull().references(() => riotAccountLogs.id, { onDelete: "cascade" }),
  twitchId: text().notNull().references(() => users.twitchId, { onDelete: "cascade" }),
  reaction: integer().notNull(),
  createdAt: integer().notNull().default(unixepoch({ mode: "ms" })),
  updatedAt: integer().notNull().default(unixepoch({ mode: "ms" }))
}, table => [
  unique("log_reactions_log_id_twitch_id_idx").on(table.logId, table.twitchId)
]);
