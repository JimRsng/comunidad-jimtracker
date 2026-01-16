<script setup lang="ts">
defineProps<{
  data: JimTableData;
}>();
</script>

<template>
  <div class="flex items-center justify-center">
    {{
      data.wins || data.losses
        ? (((data.wins || 0) / ((data.wins || 0) + (data.losses || 0))) * 100).toFixed(2) + '%'
        : ''
    }}
  </div>
</template>
