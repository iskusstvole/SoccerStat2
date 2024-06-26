<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>League Details</h1>
        <v-data-table :headers="headers" :items="matches" class="elevation-1">
          <template v-slot:item.date="{ item }">
            <span>{{ formatDate(item.utcDate) }}</span>
          </template>
          <template v-slot:item.time="{ item }">
            <span>{{ formatTime(item.utcDate) }}</span>
          </template>
          <template v-slot:item.status="{ item }">
            <span>{{ item.status }}</span>
          </template>
          <template v-slot:item.teams="{ item }">
            <span>{{ item.homeTeam.name }} vs {{ item.awayTeam.name }}</span>
          </template>
          <template v-slot:item.score="{ item }">
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
    const response = await $axios.get(`/v4/competitions/${route.params.id}/matches`)
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
