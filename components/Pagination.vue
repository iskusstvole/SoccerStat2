<template>
    <v-container>
      <v-row justify="center">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          @input="emitPageChange"
        ></v-pagination>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue'
  
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
  
  const emit = defineEmits(['page-change'])
  
  const currentPage = ref(1)
  const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))
  
  watch(currentPage, (newPage) => {
    emit('page-change', newPage)
  })
  
  const emitPageChange = () => {
    emit('page-change', currentPage.value)
  }
  </script>
  