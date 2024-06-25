<template>
    <div>
        <h1 v-if="error">Упс! произошла ошибка {{ error }}</h1>
    
       <div v-if="competitions">
        <div v-for="competition in competitions" :key="competition.id">
            <v-container 
                    grid-list-md text-xs-center>
                        <v-layout row wrap>
                        <v-flex v-for="i in 3" :key="`${i}`" xs4>
                            <v-card 
                            class="mx-auto"
                            max-width="344"
                            min-width="250"
                            hover
                            >
                            <v-card-item>
                            <v-card-title>
                                {{name}}
                            </v-card-title>
                            <v-img
                                height="200px"
                                
                                cover
                                ></v-img>
                            </v-card-item>
                            
                            <v-card-text>
                                
                            </v-card-text>
                        </v-card>
                         </v-flex>
                        </v-layout>
                    </v-container>
        </div>
                    
            </div>
        </div>
    
    </template>

<script setup>
const { 
    data : competitions,
    error,
    refresh,


 } = await useFetch('https://api.football-data.org/v2/competitions/')

</script>