CREATE TABLE `riot_accounts` (
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
	FOREIGN KEY (`twitch_id`) REFERENCES `users`(`twitch_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`twitch_id` text PRIMARY KEY NOT NULL,
	`twitch_login` text NOT NULL,
	`twitch_display` text NOT NULL,
	`twitch_profile_image` text,
	`twitch_cumulative_months` integer,
	`twitch_sub_expiration` integer,
	`country` text,
	`bio` text,
	`badges` text,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
