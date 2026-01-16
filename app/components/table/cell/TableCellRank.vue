<script setup lang="ts">
defineProps<{
  data: JimTableData;
}>();
</script>

<template>
  <div class="flex items-center justify-center font-semibold">
    {{ data.rank }}
  </div>
</template>
