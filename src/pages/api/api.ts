import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000'

const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem('token')
    return accessToken
  }
  return null
}

const createAxiosInstance = () => {
  const accessToken = getAccessToken()

  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined
    }
  })

  return instance
}

export const api = createAxiosInstance()
