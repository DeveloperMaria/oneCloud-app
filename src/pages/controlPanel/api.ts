import { api } from '../api/api'

export const getAllControlPanel = async () => {
  try {
    const response = await api.get('/controlPanel/')
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`Failed to fetch Control Panel. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching Control Panel:', error)
    throw error
  }
}






