<template>
  <div>
    <v-app>
      <v-app-bar color="#033" fixed app>
        <v-img src="@/public/icon-ss.png" max-width="50" class="mr-2"></v-img>
        <v-toolbar-title class="title-text">SoccerStat</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="gray" rounded="xl" nuxt to="../Competitions">Лиги</v-btn>
        <v-btn color="gray" rounded="xl" nuxt to="../Teams">Команды</v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <slot />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<style scoped>
.title-text {
  margin-left: 8px;
}
</style>
