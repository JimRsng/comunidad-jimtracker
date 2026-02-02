<script setup lang="ts">
const props = defineProps<{
  region: string;
  size?: "sm" | "md" | "lg" | "xs" | "xl";
}>();
</script>

<template>
  <div class="flex items-center justify-center">
    <UBadge
      :label="getRegionLabel(props.region)"
      :size="props.size"
      variant="outline"
      :ui="{ base: 'bg-default ring-0' }"
      :class="`${props.region.toLowerCase()}-badge region-badge`"
    />
  </div>
</template>
