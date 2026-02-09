<script setup lang="ts">
const props = defineProps<{
  selectedRole: string | null;
  selectedSlot: 1 | 2;
}>();

const emit = defineEmits(["update:role"]);

const emitUpdate = (role: string | null) => {
  emit("update:role", { slot: props.selectedSlot, role });
};

const roles = ["top", "jungle", "mid", "adc", "support"];
</script>

<template>
  <div class="flex flex-wrap justify-center items-center max-w-36 gap-1 p-1">
    <div v-for="role in roles" :key="role" variant="ghost" color="neutral" class="flex flex-col items-center justify-center gap-1 p-1 rounded-sm hover:bg-accented/50" :class="{ 'bg-accented/50': selectedRole === role }" @click="emitUpdate(role)">
      <Icon :name="`lol:${role}`" class="w-7 h-7" />
    </div>
    <div variant="ghost" color="neutral" class="flex flex-col items-center justify-center gap-1 p-1 rounded-sm hover:bg-accented/50" @click="emitUpdate('fill')">
      <Icon name="lol:fill" class="w-7 h-7" />
    </div>
    <div variant="ghost" color="neutral" class="flex flex-col items-center justify-center gap-1 p-1 rounded-sm hover:bg-accented/50" @click="emitUpdate(null)">
      <Icon name="lucide:x" class="w-7 h-7 text-error" />
    </div>
  </div>
</template>
