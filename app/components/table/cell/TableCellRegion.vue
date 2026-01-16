<script setup lang="ts">
defineProps<{
  data: JimTableData;
}>();
</script>

<template>
  <RegionBadge :region="data.region" size="lg" />
</template>
