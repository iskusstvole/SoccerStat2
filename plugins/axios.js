// plugins/axios.js
import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  const instance = axios.create({
    baseURL: 'https://api.football-data.org/',
    headers: {
      'X-Auth-Token': config.public.footballDataApiKey
    }
  })

  return {
    provide: {
      axios: instance
    }
  }
})
