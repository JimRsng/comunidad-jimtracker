<script setup lang="ts">
defineProps<{
  data: JimTableData;
}>();
</script>

<template>
  <div v-if="data.wins || data.losses" class="flex items-center justify-center">
    {{ (data.wins || 0) + (data.losses || 0) }}
  </div>
</template>
