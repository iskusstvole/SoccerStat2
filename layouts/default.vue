<template>
  <div>
    
    <v-app >
  
      <v-app-bar  fixed app>
          <v-icon class="mx-2">mdi-soccer</v-icon>
        <v-toolbar-title>SoccerStat</v-toolbar-title>
        
        <v-btn color="primary" nuxt to="../Competitions">Лиги</v-btn>
        <v-btn color="primary" nuxt to="../Teams"> Команды </v-btn>
  
      </v-app-bar>
      
  
      
    
    <v-main>
        <v-container>
          <slot />
        </v-container>
      </v-main>
    </v-app>
  </div>
  </template>
  
  