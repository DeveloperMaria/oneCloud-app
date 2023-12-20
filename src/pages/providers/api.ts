import { api } from '../api/api'

export const getAllProvider = async () => {
  try {
    const response = await api.get('/provider/')
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`Failed to fetch Provider. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching Provider:', error)
    throw error
  }
}

export const addProvider = async (userData: any) => {
  try {
    const response = await api.post('/provider/add', userData)

    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Failed to add a Provider. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error adding Provider:', error)
    throw error
  }
}

export const updateProvider = async (providerId: any, newUserData: any) => {
  try {
    const response = await api.post(`/provider/update/${providerId}`, newUserData)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Failed to update Provider. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error updating Provider:', error)
    throw error
  }
}

export const deleteProvider = async (providerId: any) => {
  try {
    const response = await api.post(`/provider/delete/${providerId}`)
    return response.data
  } catch (error) {
    console.error('Error deleting Provider:', error)
    throw error
  }
}
