declare global {
  interface JimUser {
    twitchId: string;
    twitchLogin: string;
    twitchDisplay: string;
    twitchProfileImage: string | null;
    twitchCumulativeMonths: number | null;
    twitchSubExpiration: number | null;
    country: string | null;
    bio: string | null;
    badges: string[] | null;
    createdAt: number;
    updatedAt: number;
  }
}

export {};
