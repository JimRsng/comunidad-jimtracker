<script setup lang="ts">
import type { InputHTMLAttributes } from "vue";

const props = defineProps<{
  id?: string;
  name?: string;
  type?: InputHTMLAttributes["type"];
  icon?: string;
  placeholder: string;
  autocomplete?: InputHTMLAttributes["autocomplete"];
  required?: boolean;
  value?: string | number;
  disabled?: boolean;
  readonly?: boolean;
  modelModifiers?: {
    number?: boolean;
    slug?: boolean;
    trim?: boolean;
  };
}>();

const emit = defineEmits<{
  change: [string];
  focus: [FocusEvent];
  blur: [FocusEvent];
}>();

const [model, modifiers] = defineModel<string | number>();

const applyModifiers = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (modifiers.trim && typeof model.value === "string") {
    input.value = model.value.trim();
  }

  emit("change", input.value);
};

const binds = {
  id: props.id,
  name: props.name,
  type: props.type || "text",
  placeholder: "",
  autocomplete: props.autocomplete,
  required: props.required,
  disabled: props.disabled,
  readonly: props.readonly
};

const slots = useSlots();
</script>

<template>
  <div class="form-input-floating w-full" :class="{ 'form-input-icon': icon || slots.icon }">
    <div v-if="slots.icon" class="input-icon">
      <slot name="icon" />
    </div>
    <Icon v-else-if="icon" :name="icon" class="input-icon h-5 w-5 text-primary" />
    <input
      v-if="!value"
      v-model="model"
      class="from-input peer"
      v-bind="binds"
      @change="applyModifiers"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    >
    <input
      v-else
      class="from-input peer"
      :value="value"
      v-bind="binds"
      @change="applyModifiers"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    >
    <label :for="id" :class="{ 'pl-8': icon }">
      {{ placeholder }}
    </label>
  </div>
</template>
