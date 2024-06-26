
<template>
    <v-container>
      <v-row>
        <v-col
          v-for="league in leagues"
          :key="league.id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card
          nuxt
          :to="{ name: 'CompetitionCalendar', params: { id: league.id } }"
          hover>
            <v-card-title>{{ league.name }}</v-card-title>
            <v-img
            :src="league.emblemUrl"
            alt="League emblem"
            height="200"
            hover
          ></v-img>
            <v-card-subtitle>{{ league.area.name }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  const leagues = ref([])
  
  const fetchLeagues = async () => {
    try {
      const { $axios } = useNuxtApp()
      const response = await $axios.get('/competitions')
      leagues.value = response.data.competitions
    } catch (error) {
      console.error('Failed to fetch leagues:', error)
    }
  }
  
  onMounted(fetchLeagues)
  </script>
  