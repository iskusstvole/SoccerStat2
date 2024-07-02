<template>
  <v-text-field 
    label="Поиск" 
    variant="solo-filled"
    max-width="344"
    v-model="searchQuery"
    @input="filteredLeagues"
  ></v-text-field>
  
  <v-container>
    <v-row>
      <v-col
        v-for="league in paginatedLeagues"
        :key="league.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card
          nuxt
          :to="{ name: 'CompetitionCalendar', query: { id: league.id } }"
          hover
        >
          <v-card-title>{{ league.name }}</v-card-title>
          <v-img
            :src="league.emblem"
            alt="League emblem"
            height="160"
            hover
          ></v-img>
          <v-card-subtitle>{{ league.area.name }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <Pagination
      :totalItems="filteredLeagues.length"
      :itemsPerPage="itemsPerPage"
      @page-change="handlePageChange"
    />
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import Pagination from '@/components/Pagination.vue'

const leagues = ref([])
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(9)

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

const paginatedLeagues = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredLeagues.value.slice(start, end)
})

const handlePageChange = (newPage) => {
  currentPage.value = newPage
}

onMounted(fetchLeagues)

watch(searchQuery, () => {
  currentPage.value = 1
})
</script>
