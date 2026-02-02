<template>
  <UFooter class="border-t border-default">
    <template #left>
      <p class="text-muted text-sm">{{ SITE.name }} © {{ new Date().getFullYear() }}</p>
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
        <Icon name="simple-icons:github" class="w-8 h-8" />
      </NuxtLink>
    </template>
  </UFooter>
</template>
