<template>
  <v-container>
    <div class="breadcrumbs">
      <span @click="navigateToCompetitions">Лиги</span> >
      <span>{{ leagueName }}</span>
    </div>

    <v-row>
      <v-col>
        <h1>Матчи</h1>
        <v-row class="mt-4" align="center">
          <span class="text-center mb-4"> c </span>
          <v-text-field
            v-model="startDate"
            class="mr-2"
            type="date"
            hover
            max-width="160"
          ></v-text-field>
          <span class="mr-2 mb-4"> по </span>
          <v-text-field
            v-model="endDate"
            type="date"
            hover
            max-width="160"
          ></v-text-field>
          <v-btn class="ml-4 mb-4" @click="applyDateFilter">Применить</v-btn>
        </v-row>

        <v-data-table
          :headers="headers"
          :items="isFilterApplied ? filteredMatches : matches"
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
            <span>{{ getScore(item) }}</span>
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
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const matches = ref([]);
const filteredMatches = ref([]);
const leagueName = ref('');
const isFilterApplied = ref(false);

const startDate = ref('');
const endDate = ref('');

const fetchMatches = async () => {
  try {
    const { $axios } = useNuxtApp();
    console.log(`Fetching matches for competition ID: ${route.query?.id}`);
    const response = await $axios.get(
      `competitions/${route.query?.id}/matches?matchday=1`
    );
    matches.value = response.data.matches;
    leagueName.value = response.data.competition.name;
  } catch (error) {
    console.error("Failed to fetch matches:", error);
  }
};

const applyDateFilter = () => {
  isFilterApplied.value = true;

  if (startDate.value && endDate.value) {
    const start = new Date(startDate.value);
    start.setHours(0, 0, 0, 0); // Устанавливаем время на начало дня
    const end = new Date(endDate.value);
    end.setHours(23, 59, 59, 999); // Устанавливаем время на конец дня

    console.log("start:", start, "end:", end); // Debugging output

    const filtered = matches.value.filter(match => {
      const matchDate = new Date(match.utcDate);
      matchDate.setHours(0, 0, 0, 0); // Устанавливаем время на начало дня

      return matchDate >= start && matchDate <= end;
    });

    filteredMatches.value = filtered;

    console.log("filteredMatches:", filteredMatches.value); // Debugging output
  } else {
    filteredMatches.value = matches.value;
  }
};

const navigateToCompetitions = () => {
  router.push("/competitions");
};

onMounted(fetchMatches);
</script>
