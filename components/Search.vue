<template>
  <v-text-field
  color="#033"
    label="Поиск"
    variant="solo-filled"
    max-width="344"
    v-model="localSearchQuery"
    @input="emitSearchQuery"
  ></v-text-field>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const localSearchQuery = ref(props.modelValue);

const emitSearchQuery = () => {
  emit("update:modelValue", localSearchQuery.value);
};
</script>
