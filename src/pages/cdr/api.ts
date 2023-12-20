import { api } from '../api/api'

export const getAllDetail = async () => {
  try {
    const response = await api.get('/detailData/')
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`Failed to fetch CDR Detail. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching CDR Detail', error)
    throw error
  }
}

export const getAllTotal = async () => {
    try {
      const response = await api.get('/totalData/')
      if (response.status === 200) {
        return response.data
      } else {
        throw new Error(`Failed to fetch CDR Total. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error fetching CDR Total', error)
      throw error
    }
  }




