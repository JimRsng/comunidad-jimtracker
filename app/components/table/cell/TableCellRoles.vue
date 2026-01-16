<script setup lang="ts">
defineProps<{
  data: JimTableData;
}>();
</script>

<template>
  <RoleSelector :data="data" />
</template>
