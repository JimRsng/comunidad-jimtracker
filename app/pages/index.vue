<script setup lang="ts">
const { data } = await useFetch("/api/riot-accounts", {
  key: "riot-accounts",
  getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key],
  default: () => [] as JimTableData[]
});
</script>

<template>
  <main class="flex justify-center items-center">
    <TableData :data="data" />
  </main>
</template>
