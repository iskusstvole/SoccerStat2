// plugins/axios.js
import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  const instance = axios.create({
    baseURL: 'http://localhost:8080/',
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
