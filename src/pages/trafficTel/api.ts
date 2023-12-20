import { api } from '../api/api'

export const getAllTrafficTell = async () => {
  try {
    const response = await api.get('/trafficTel/')
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`Failed to fetch Traffic Tell. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching Traffic Tell:', error)
    throw error
  }
}




