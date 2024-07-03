<template>
  <v-breadcrumbs>
    <v-breadcrumbs-item
      v-if="isCompetitionCalendar && leagueName"
      :to="{ path: `/Competitions/${leagueId}` }"
    >
      {{ leagueName }}
    </v-breadcrumbs-item>

    <v-breadcrumbs-item
      v-if="isTeamCalendar && teamName"
      :to="{ path: `/TeamsCalendar/${teamId}` }"
    >
      {{ teamName }}
    </v-breadcrumbs-item>
  </v-breadcrumbs>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const $axios = useNuxtApp();

const leagueId = computed(() => {
  route.query?.id;
});
const leagueName = ref("");
const teamId = computed(() => route.query?.id);
const teamName = ref("");

const isCompetitionCalendar = computed(
  () => route.name === "CompetitionCalendar"
);
const isTeamCalendar = computed(() => route.name === "TeamCalendar");

const fetchLeagueName = async () => {
  if (leagueId.value) {
    try {
      const response = await $axios.get(`v4/competitions/${leagueId.value}`);
      leagueName.value = response.data.competition.name;
    } catch (error) {
      console.error("Failed to fetch league name:", error);
    }
  }
};

const fetchTeamName = async () => {
  if (teamId.value) {
    try {
      const response = await $axios.get(`v4/teams/${teamId.value}`);
      matches.value = response.data.matches;
    } catch (error) {
      console.error("Failed to fetch team name:", error);
    }
  }
};

onMounted(() => {
  if (isCompetitionCalendar.value) {
    fetchLeagueName();
  }
  if (isTeamCalendar.value) {
    fetchTeamName();
  }
});
</script>
