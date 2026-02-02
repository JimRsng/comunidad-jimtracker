<script setup lang="ts">
defineProps<{
  data: JimTableData;
}>();
</script>

<template>
  <div class="min-w-32 mx-5">
    <div class="flex w-full items-center justify-center gap-1 font-semibold">
      <span v-if="data.wins || data.losses" class="dark:text-blue-400 light:text-blue-500">{{ data.wins || 0 }}</span>
      <UProgress
        :model-value="data.wins"
        :max="(data.wins || 0) + (data.losses || 0)"
        size="lg"
        class="max-w-26 w-full"
        :ui="{ base: 'dark:bg-rose-400 light:bg-rose-500', indicator: 'dark:bg-blue-400 light:bg-blue-500 rounded-none' }"
      />
      <span v-if="data.wins || data.losses" class="dark:text-rose-400 light:text-rose-500">{{ data.losses || 0 }}</span>
    </div>
  </div>
</template>
