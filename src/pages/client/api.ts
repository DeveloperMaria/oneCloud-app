import { api } from '../api/api'

export const getAllClient = async () => {
  try {
    const response = await api.get('/client/')
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`Failed to fetch Client. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching Client:', error)
    throw error
  }
}

export const addClient = async (userData: any) => {
  try {
    const response = await api.post('/client/add', userData)

    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Failed to add a Client. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error adding Client:', error)
    throw error
  }
}

export const updateClient = async (providerId: any, newUserData: any) => {
  try {
    const response = await api.post(`/client/update/${providerId}`, newUserData)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Failed to update Client. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error updating Client:', error)
    throw error
  }
}

export const deleteClient = async (providerId: any) => {
  try {
    const response = await api.post(`/client/delete/${providerId}`)
    return response.data
  } catch (error) {
    console.error('Error deleting Client:', error)
    throw error
  }
}
