<template>
    <v-breadcrumbs>
      <v-breadcrumbs-item :to="{ path: '/' }">Главная</v-breadcrumbs-item>
      <v-breadcrumbs-item :to="{ path: '/Competitions' }">Лиги</v-breadcrumbs-item>
      <v-breadcrumbs-item v-if="leagueName" :to="{ path: `/CompetitionsCalendar/${leagueId}` }">{{ leagueName }}</v-breadcrumbs-item>
    </v-breadcrumbs>
  </template>
  
  <script setup>
  import { computed, ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  
  
  const route = useRoute()
  const $axios = useNuxtApp()
  
  const leagueId = computed(() => {route.query?.id})
  const leagueName = ref('')
  
  const fetchLeagueName = async () => {
    try {
      const response = await $axios.get(`v4/competitions/${route.query?.id}`)
      leagueName.value = response.data.competition.name
    } catch (error) {
      console.error('Failed to fetch league name:', error)
    }
  }
  
  onMounted(fetchLeagueName)
  </script>
  
  <style scoped>
  /* Стилизуйте хлебные крошки по вашему усмотрению */
  </style>
  