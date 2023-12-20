import { api } from '../api/api'

export const getAllArticle = async () => {
  try {
    const response = await api.get('/article/')
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`Failed to fetch Article. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching Article:', error)
    throw error
  }
}






