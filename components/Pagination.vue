<template>
  <v-pagination
    v-model="currentPage"
    :length="Math.ceil(totalItems / itemsPerPage)"
     @input="emitPageChange"
    color="primary"
  ></v-pagination>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
const emit = defineEmits(['page-change'])

const props = defineProps({
    totalItems: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      default: 10,
    }
  })

const currentPage = ref(1)

watch(currentPage, (newPage) => {
    emit('page-change', newPage)
  })
  
  const emitPageChange = () => {
    emit('page-change', currentPage.value)
  }
</script>
