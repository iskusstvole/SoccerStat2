<template>
    <div class="breadcrumbs">
      <span @click="navigateToCompetitions">Лиги</span> >
      <span>{{ leagueName }}</span>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useNuxtApp } from '#app'
  
  const route = useRoute()
  const router = useRouter()
  const leagueName = ref('')
  
  const fetchMatches = async () => {
    try {
      const { $axios } = useNuxtApp()
      console.log(`Fetching matches for competition ID: ${route.query?.id}`)
      const response = await $axios.get(`competitions/${route.query?.id}/matches?matchday=1`)
      leagueName.value = response.data.competition.name
    } catch (error) {
      console.error('Failed to fetch matches:', error)
    }
  }
  
  const navigateToCompetitions = () => {
    router.push('/competitions')
  }
  
  onMounted(fetchMatches)
  </script>
  
  <style>
  .breadcrumbs {
    margin-bottom: 20px;
  }
  
  .breadcrumbs span {
    cursor: pointer;
    color: #3f51b5;
  }
  
  .breadcrumbs span:hover {
    text-decoration: underline;
  }
  </style>
  