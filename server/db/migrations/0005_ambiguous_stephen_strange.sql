CREATE TABLE `log_reactions` (
	`id` integer PRIMARY KEY NOT NULL,
	`log_id` integer NOT NULL,
	`twitch_id` text NOT NULL,
	`reaction` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`log_id`) REFERENCES `riot_account_logs`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`twitch_id`) REFERENCES `users`(`twitch_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `log_reactions_log_id_twitch_id_idx` ON `log_reactions` (`log_id`,`twitch_id`);--> statement-breakpoint
CREATE TABLE `riot_account_logs` (
	`id` integer PRIMARY KEY NOT NULL,
	`puuid` text NOT NULL,
	`twitch_id` text NOT NULL,
	`description` text,
	`data` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`puuid`) REFERENCES `riot_accounts`(`puuid`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`twitch_id`) REFERENCES `users`(`twitch_id`) ON UPDATE no action ON DELETE cascade
);
