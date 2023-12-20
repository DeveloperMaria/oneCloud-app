import { api } from '../api/api'

export const getAllCreditNote = async () => {
  try {
    const response = await api.get('/creditNote/')
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`Failed to fetch Credit Note. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching Credit Note:', error)
    throw error
  }
}






