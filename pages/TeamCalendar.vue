<template>
  
    <v-container>  
      <div class="breadcrumbs">
      <span @click="navigateToTeams">Команды</span> >
      <span>{{ teamName }}</span>
    </div> 
          <v-row>
        <v-col>
          <h1>Матчи</h1>
          <v-row
          class="mt-4" 
          align="center" 
          >
           <span class="text-center mb-4"> c </span>
      <v-text-field 
      v-model="startDate"
      class="mr-2  "
      type="date" 
      hover 
      max-width="160"
      ></v-text-field>
      <span class="mr-2 mb-4"> по    </span>
      <v-text-field 
       v-model="endDate"
      type="date" 
      hover 
      max-width="160"
      ></v-text-field>
      <v-btn class="ml-4 mb-4" @click="applyDateFilter" >Применить</v-btn>
    </v-row>
        
          <v-data-table 
          :headers="headers" 
          :items="filteredMatches.length ? filteredMatches : matches" 
          class="elevation-1 mt-2"
          v-if="matches.length > 0"
          >
            <template #[`item.date`]="{ item }">
              <span>{{ formatDate(item.utcDate) }}</span>
            </template>
            <template #[`item.time`]="{ item }">
              <span>{{ formatTime(item.utcDate) }}</span>
            </template>
            <template #[`item.status`]="{ item }">
              <span>{{ getStatus(item.status) }}</span>
            </template>
            <template #[`item.teams`]="{ item }">
              <span>{{ item.homeTeam.name }} vs. {{ item.awayTeam.name }}</span>
            </template>
            <template #[`item.score`]="{ item }">
              <span >{{ getScore(item) }}</span>
            </template>
          </v-data-table>
          <div v-else>
            <p>Загрузка...</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  
  
  const route = useRoute()
  const router = useRouter()
  
  const matches = ref([])
  const filteredMatches = ref([])
  const teamName = ref('')

  const breadcrumbs = ref([
  { text: 'Команды', disabled: false, href: '/teams' },
  { text: '', disabled: true }, 
])

 
  const startDate = ref('')
  const endDate = ref('')
  
  
  
  const fetchMatches = async () => {
    try {
      const { $axios } = useNuxtApp()
      console.log(`Fetching matches for Team ID: ${route.query?.id}`)
      const response = await $axios.get(`teams/${route.query?.id}/matches`)
      matches.value = response.data.matches
      
      const teamId = route.query?.id;

      teamName.value = response.data.matches[0].homeTeam.id == teamId 
                 ? response.data.matches[0].homeTeam.name 
                 : response.data.matches[0].awayTeam.name;
                 
      
    } catch (error) {
      console.error('Failed to fetch matches:', error)
    }
  }
  
  
  
  
  
  
  // Фильтрация матчей по выбранному диапазону дат
  
  const applyDateFilter = () => {
    if (startDate.value && endDate.value) {
      const start = new Date(startDate.value)
      const end = new Date(endDate.value)
      end.setDate(end.getDate() + 1) 
      filteredMatches.value = matches.value.filter(match => {
        const matchDate = new Date(match.utcDate)
        return matchDate >= start && matchDate <= end
      })
    } else {
      filteredMatches.value = matches.value
    }
  }
    
  const navigateToTeams = () => {
  router.push('/Teams')
}
 
  onMounted(fetchMatches)
  
  
  </script>
  
  