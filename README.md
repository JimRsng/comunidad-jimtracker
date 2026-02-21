# Comunidad JimTracker

A full-stack serverless League of Legends multi-regional leaderboard tracker for [JimRsng](https://www.twitch.tv/jimrsng)'s Twitch community.

## Features

- Multi-regional support
- Riot Account integration
- User profiles
- Automated data refresh every 30 minutes
- Data distribution visualization
- Serverless architecture
- Twitch authentication
- Twitch chatters indicator
- Color mode support

## Screenshots

### Leaderboard Table
![table](https://github.com/user-attachments/assets/491eddd1-5185-4ead-aa26-55ce6051b785)

### Distribution Section
![distribution](https://github.com/user-attachments/assets/cfc945e3-8226-436d-926a-3e6104a28c56)

### Profile Page
![profile](https://github.com/user-attachments/assets/6d9a197e-6016-420b-957a-5e1638fc26cc)

### Activity Page
![activity](https://github.com/user-attachments/assets/65559907-aef2-4a93-8243-28abb84e342f)

## Tech stack

- **Framework**: [Nuxt 4](https://nuxt.com/), the [Vue](https://vuejs.org/) framework for bringing the best development experience and [NuxtHub](https://hub.nuxt.com/) features.
- **UI Library**: [Nuxt UI](https://ui.nuxt.com/).
- **Deployment**: Serverless hosted on [Cloudflare Workers](https://workers.cloudflare.com/).
- **Database**: [Cloudflare D1](https://developers.cloudflare.com/d1/) serverless SQL database.
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) TypeScript ORM for SQL databases.
- **Task Scheduling**: [Cloudflare Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/).
- **APIs**:
  - [twisted](https://github.com/Sansossio/twisted): Riot Games API wrapper.
  - [twurple](https://github.com/twurple/twurple): Twitch API wrapper.
- **Authentication**: [nuxt-auth-utils](https://github.com/Atinux/nuxt-auth-utils) sessions and OAuth integrations.
- **Package Manager**: [pnpm](https://pnpm.io/).

## Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Cloudflare Account](https://cloudflare.com/)
- Riot Games API key from [Riot Developer Portal](https://developer.riotgames.com/)
- Riot Games developer app from [Riot Developer Portal (Beta)](https://beta.developer.riotgames.com/)
- Twitch developer app from [Twitch Developer Console](https://dev.twitch.tv/console)

## License

Made with ❤️ by [Ahmed](https://github.com/ahmedrangel) and [Yizack](https://github.com/yizack).

Open Source app and published under [MIT License](https://github.com/ahmedrangel/comunidad-jimtracker/blob/main/LICENSE).

## Development

<details>
  <summary>Local development</summary>

```sh
# Install dependencies
pnpm install

# Datebase migration
pnpm db:migrate

# Build
pnpm build

# Run ESLint
pnpm lint

# Run typecheck
pnpm test:types
```

</details>

