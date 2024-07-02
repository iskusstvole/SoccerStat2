<template>
    <v-text-field 
      label="Поиск" 
      variant="solo-filled"
      max-width="344"
      v-model="searchQuery"
      @input="filteredTeams"
    ></v-text-field>
    
    <v-container>
      <v-row>
        <v-col
      @input="filteredTeams"
          v-for="team in paginatedTeams"
          :key="team.id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card
            nuxt
            :to="{ name: 'TeamCalendar', query: { id: team.id } }"
            hover
          >
            <v-card-title>{{ team.name }}</v-card-title>
            <v-img
              :src="team.crest"
              alt="Team crest"
              height="170"
              hover
            ></v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <Pagination
    :totalItems="filteredTeams.length"
    :itemsPerPage="itemsPerPage"
    @page-change="handlePageChange"
  />
   
  </template>
  
  <script setup>
     import { ref, computed, onMounted, watch } from 'vue'
     import Pagination from '@/components/Pagination.vue'


     const teams = ref([])
     const searchQuery = ref('')
     const currentPage = ref(1)
     const itemsPerPage = ref(9)
    
    const filteredTeams = computed (()=>
    teams.value.filter (team =>
        team.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    )

     const fetchTeams = async () => {
      try {
        const { $axios } = useNuxtApp()
        const response = await $axios.get('/teams')
          teams.value = response.data.teams
  } catch (error) {
    console.error('Failed to fetch teams:', error)
  }
}
const paginatedTeams = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredTeams.value.slice(start, end)
})

const handlePageChange = (newPage) => {
  currentPage.value = newPage
}

watch(searchQuery, () => {
  currentPage.value = 1
})
onMounted(fetchTeams)
  </script>
  