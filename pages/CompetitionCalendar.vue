<template>
  
  <v-container>
    <div class="breadcrumbs">
      <span @click="navigateToCompetitions">Лиги</span> >
      <span>{{ leagueName }}</span>
    </div>
        <v-row>
      <v-col>
        <h1>Матчи</h1>
        <v-row 
        align="center" 
       
        >
         <span class="text-center mb-4"> c </span>
    <v-text-field 
    v-model="startDate"
    class="mr-2 "
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
        
        hover
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
const leagueName = ref('')


const headers = [
  { title: 'Дата проведения матча', value: 'date', align: 'start', width: '150px' },
  { title: 'Время', value: 'time', align: 'start', width: '100px' },
  { title: 'Статус матча', value: 'status', align: 'start', width: '150px' },
  { title: 'Команды', value: 'teams', align: 'start', width: '300px' }, 
  { title: 'Счет', value: 'score', align: 'start', width: '100px' }
]

const startDate = ref('')
const endDate = ref('')

const breadcrumbs = ref([
  { text: 'Лиги', disabled: false, href: '/competitions' },
  { text: '', disabled: true }, // Пока пустое название лиги
])

const fetchMatches = async () => {
  try {
    const { $axios } = useNuxtApp()
    console.log(`Fetching matches for competition ID: ${route.query?.id}`)
    const response = await $axios.get(`competitions/${route.query?.id}/matches?matchday=1`)
    matches.value = response.data.matches
    
    leagueName.value = response.data.competition.name
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
const getStatus = (status) => {
  switch (status) {
    case 'FINISHED':
      return 'Закончен';
    case 'IN_PLAY':
      return 'В игре';
    case 'TIMED':
      return 'Запланирован';
    case 'POSTPONED':
      return 'Отложен';
    case 'CANCELED':
      return 'Отменен';
    case 'LIVE':
      return 'В прямом эфире';
    case 'PAUSED':
      return 'Пауза';
    case 'SUSPENDED':
      return 'Приостановлен';
    default:
      return status;
  }
}

const getScore = (item) => {
  if (item.status === 'FINISHED') {
    const fullTimeScore = `(${item.score.fullTime.home} - ${item.score.fullTime.away})`;
    const halfTimeScore = item.score.halfTime ? `(${item.score.halfTime.home} - ${item.score.halfTime.away})` : '';
    const penaltiesScore = item.penalties ? `(${item.penalties.home} - ${item.penalties.away})` : '(-)';
    return `${fullTimeScore}${halfTimeScore}${penaltiesScore}`;
  } else {
    return 'Матч еще не состоялся';
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
  

const navigateToCompetitions = () => {
  router.push('/competitions')
}
onMounted(fetchMatches)


</script>

<style scoped>
.text-center {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px; /* Ширина для текста "c" */
  height: 100%;
}
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