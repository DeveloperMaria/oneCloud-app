import { api } from '../api/api'

export const getAllNetMap = async () => {
  try {
    const response = await api.get('/netMap/')
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`Failed to fetch netMap. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching netMap:', error)
    throw error
  }
}

export const addNetMap = async (userData: any) => {
  try {
    const response = await api.post('/netMap/add', userData)

    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Failed to add a netMap. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error adding netMap:', error)
    throw error
  }
}

export const updateNetMap = async (userId: any, newUserData: any) => {
  try {
    const response = await api.post(`/netMap/update/${userId}`, newUserData)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Failed to update netMap. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error updating netMap:', error)
    throw error
  }
}

export const deleteNetMap = async (userId: any) => {
  try {
    const response = await api.post(`/netMap/delete/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error deleting netMap:', error)
    throw error
  }
}
