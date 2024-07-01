
import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  const instance = axios.create({
    baseURL: 'http://localhost:8081/v4/',
    headers: {
      'X-Auth-Token': config.public.footballDataApiKey,
       'Content-Type': "application/json"
    }
  })

  return {
    provide: {
      axios: instance
    }
  }
})
