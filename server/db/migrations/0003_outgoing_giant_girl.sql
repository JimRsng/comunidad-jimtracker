PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_riot_accounts` (
	`puuid` text PRIMARY KEY NOT NULL,
	`twitch_id` text NOT NULL,
	`game_name` text NOT NULL,
	`tag_line` text NOT NULL,
	`region` text NOT NULL,
	`tier` text,
	`division` text,
	`lp` integer,
	`wins` integer,
	`losses` integer,
	`profile_icon` integer,
	`verified` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`twitch_id`) REFERENCES `users`(`twitch_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_riot_accounts`("puuid", "twitch_id", "game_name", "tag_line", "region", "tier", "division", "lp", "wins", "losses", "profile_icon", "verified", "created_at", "updated_at") SELECT "puuid", "twitch_id", "game_name", "tag_line", "region", "tier", "division", "lp", "wins", "losses", "profile_icon", "verified", "created_at", "updated_at" FROM `riot_accounts`;--> statement-breakpoint
DROP TABLE `riot_accounts`;--> statement-breakpoint
ALTER TABLE `__new_riot_accounts` RENAME TO `riot_accounts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;