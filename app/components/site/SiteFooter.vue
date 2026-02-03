<script setup lang="ts">
import { useTimeAgoIntl } from "@vueuse/core";

const config = useRuntimeConfig();
const buildInfo = config.public.buildInfo;

const timeAgo = useTimeAgoIntl(buildInfo.time, {
  locale: "es"
});
</script>

<template>
  <UFooter class="border-t border-default">
    <template #left>
      <div class="flex flex-col lg:flex-row items-center gap-2">
        <p class="text-muted text-sm">{{ SITE.name }} © {{ new Date().getFullYear() }}</p>
        <UPopover mode="hover" :content="{ side: 'top' }" arrow>
          <NuxtLink :to="`${SITE.github.repository}/commit/${buildInfo.commit}`" target="_blank">
            <UBadge
              color="neutral"
              variant="subtle"
              class="flex hover:text-highlighted hover:underline text-muted"
            >
              <span class="font-mono">Build {{ buildInfo.shortCommit }}</span>
            </UBadge>
          </NuxtLink>
          <template #content>
            <p>{{ timeAgo }}</p>
          </template>
        </UPopover>
      </div>
    </template>
    <span class="text-sm">
      <NuxtLink :to="SITE.github.repository" target="_blank" class="dark:text-blue-300 light:text-blue-500 font-semibold hover:underline">Creado</NuxtLink>
      con ❤️ por
      <NuxtLink :to="SITE.github.authors.ahmed.url" target="_blank" class="dark:text-emerald-300 light:text-emerald-600 font-semibold hover:underline">
        {{ SITE.github.authors.ahmed.name }}
      </NuxtLink>
      y
      <NuxtLink :to="SITE.github.authors.yizack.url" target="_blank" class="dark:text-yellow-300 light:text-yellow-600 font-semibold hover:underline">
        {{ SITE.github.authors.yizack.name }}
      </NuxtLink>
    </span>
    <template #right>
      <NuxtLink :to="SITE.github.repository" target="_blank" class="hover:text-highlighted">
        <Icon name="simple-icons:github" size="2rem" />
      </NuxtLink>
    </template>
  </UFooter>
</template>
