import { api } from '../api/api'

export const getAllPassiveInvoice = async () => {
  try {
    const response = await api.get('/passiveInvoice/')
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`Failed to fetch passive Invoice. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching Passive Invoice:', error)
    throw error
  }
}

export const addPassiveInvoice = async (userData: any) => {
  try {
    const response = await api.post('/passiveInvoice/add', userData)

    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Failed to add a Passive Invoice. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error adding Passive Invoice:', error)
    throw error
  }
}

export const updatePassiveInvoice = async (passiveId: any, newUserData: any) => {
  try {
    const response = await api.post(`/passiveInvoice/update/${passiveId}`, newUserData)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Failed to update Passive Invoice. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error updating Passive Invoice:', error)
    throw error
  }
}

export const deletePassiveInvoice = async (passiveId: any) => {
  try {
    const response = await api.post(`/passiveInvoice/delete/${passiveId}`)
    return response.data
  } catch (error) {
    console.error('Error deleting Passive Invoice:', error)
    throw error
  }
}
