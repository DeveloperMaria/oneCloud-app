import { api } from '../api/api'

export const getAllInvention = async () => {
  try {
    const response = await api.get('/technicalInvention/')
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`Failed to fetch Technical Invention. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching Technical Invention:', error)
    throw error
  }
}

export const addInvention = async (userData: any) => {
  try {
    const response = await api.post('/technicalInvention/add', userData)

    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Failed to add a Technical Invention. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error adding Technical Invention:', error)
    throw error
  }
}

export const updateInvention = async (passiveId: any, newUserData: any) => {
  try {
    const response = await api.post(`/technicalInvention/update/${passiveId}`, newUserData)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Failed to update Technical Invention. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error updating Technical Invention:', error)
    throw error
  }
}

export const deleteInvention = async (passiveId: any) => {
  try {
    const response = await api.post(`/technicalInvention/delete/${passiveId}`)
    return response.data
  } catch (error) {
    console.error('Error deleting Technical Invention:', error)
    throw error
  }
}
