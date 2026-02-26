export default defineCachedEventHandler(async () => {
  const streamElementsChannelId = "5932bd53b5034907fbcbcd51";
  const emotes = await $fetch<StreamElementsEmotes>(`/kappa/v2/channels/${streamElementsChannelId}/emotes`, {
    baseURL: "https://api.streamelements.com"
  });

  if (!emotes) return {};

  const emoteLookup: Record<string, string> = {};

  for (const [, provider] of Object.entries(emotes) as [string, StreamElementsEmotes[keyof StreamElementsEmotes]][]) {
    for (const emote of Object.values(provider) as StreamElementsEmotes[keyof StreamElementsEmotes][number][]) {
      emoteLookup[emote.name] = emote.urls["1"]!;
    }
  }

  return emoteLookup;
}, {
  maxAge: 7 * 24 * 60 * 60, // 1 week
  swr: false,
  group: "api",
  name: "channel-emotes",
  getKey: () => "all"
});
