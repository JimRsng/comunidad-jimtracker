<script setup lang="ts">
const props = defineProps<{
  text: string;
}>();

const { data: emotes } = await useLazyFetch("/api/channel-emotes", {
  key: "channel-emotes",
  getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key]
});

const parsedText = computed(() => {
  if (!emotes.value) return props.text;

  const words = props.text.split(" ");
  const parts: string[] = [];

  for (const word of words) {
    const emote = emotes.value[word];
    parts.push(emote ? `<img class="inline-block align-middle h-8" src="${emote}" alt="${word}" title="${word}">` : word);
  }

  return parts.join(" ");
});
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <span v-html="parsedText" />
</template>
