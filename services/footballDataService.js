// ~/services/footballDataService.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.football-data.org/v2',
  headers: {
    'X-Auth-Token': '85d4b5e97a944b588b2b5a0a2d848633' 
  }
});

export async function getAllCompetitions() {
  try {
    const response = await apiClient.get('/competitions');
    return response.data;
  } catch (error) {
    console.error('Error fetching competitions:', error);
    throw error;
  }
}
