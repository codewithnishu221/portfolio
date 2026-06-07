import axios from 'axios'

const API_BASE_URL = 'http://localhost:8081/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const submitContact = async (data) => {
  return apiClient.post('/contact', data)
}

export const chatWithAI = async (message) => {
  const response = await apiClient.post('/ai/chat', { message })
  return response.data.response
}

export default apiClient
