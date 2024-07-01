
<template>
   <v-text-field 
   label="Поиск" 
   variant="solo-filled"
   max-width="344"
   v-model="searchQuery"
    @input="filterLeagues"
   ></v-text-field>
    <v-container>
      <v-row>
        <v-col
          v-for="league in filteredLeagues.length > 0 ? filteredLeagues : leagues"
          :key="league.id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card
          nuxt
          :to="{ name: 'CompetitionCalendar', query: {  id: league.id } }"
          hover>
            <v-card-title>{{ league.name }}</v-card-title>
            <v-img
            :src="league.emblem"
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
  const searchQuery = ref('')
const filteredLeagues = computed(() =>
  leagues.value.filter(league =>
    league.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    league.area.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
)
  
  const fetchLeagues = async () => {
    try {
      const { $axios } = useNuxtApp()
      const response = await $axios.get('competitions')
      leagues.value = response.data.competitions
    } catch (error) {
      console.error('Failed to fetch leagues:', error)
    }
  }
  
  onMounted(fetchLeagues)
  </script>
  