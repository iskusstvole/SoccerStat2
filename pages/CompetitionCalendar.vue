<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Календарь лиги</h1>
        <v-data-table :headers="headers" :items="matches" class="elevation-1">
          <template #[`item.date`]="{ item }">
            <span>{{ formatDate(item.utcDate) }}</span>
          </template>
          <template #[`item.time`]="{ item }">
            <span>{{ formatTime(item.utcDate) }}</span>
          </template>
          <template #[`item.status`]="{ item }">
            <span>{{ item.status }}</span>
          </template>
          <template #[`item.teams`]="{ item }">
            <span>{{ item.homeTeam.name }} vs {{ item.awayTeam.name }}</span>
          </template>
          <template #[`item.score`]="{ item }">
            <span>{{ item.score.fullTime.homeTeam }} - {{ item.score.fullTime.awayTeam }}</span>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
console.log('Route params1:', route.query) 
const matches = ref([])
const headers = [
  { text: 'Дата проведения', value: 'date' },
  { text: 'Время', value: 'time' },
  { text: 'Статус матча', value: 'status' },
  { text: 'Команды', value: 'teams' },
  { text: 'Счет', value: 'score' }
]

const fetchMatches = async () => {
  try {
    const { $axios } = useNuxtApp()
    console.log(`Fetching matches for competition ID: ${route.query?.id}`)
    const response = await $axios.get(`v4/competitions/${route.query?.id}/matches?matchday=1`)
    matches.value = response.data.matches
  } catch (error) {
    console.error('Failed to fetch matches:', error)
  }
}

const formatDate = (utcDate) => {
  const date = new Date(utcDate)
  return date.toLocaleDateString()
}

const formatTime = (utcDate) => {
  const date = new Date(utcDate)
  return date.toLocaleTimeString()
}

onMounted(fetchMatches)
</script>
