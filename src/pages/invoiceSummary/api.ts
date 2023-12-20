import { api } from '../api/api'

export const getAllInvoiceSummary = async () => {
  try {
    const response = await api.get('/invoiceSummary/')
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`Failed to fetch invoiceSummary. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching invoiceSummary:', error)
    throw error
  }
}

export const addInvoiceSummary = async (userData: any) => {
  try {
    const response = await api.post('/invoiceSummary/add', userData)

    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Failed to add a invoiceSummary. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error adding invoiceSummary:', error)
    throw error
  }
}

export const updateInvoiceSummary = async (passiveId: any, newUserData: any) => {
  try {
    const response = await api.post(`/invoiceSummary/update/${passiveId}`, newUserData)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Failed to update PassiveInvoice. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error updating invoiceSummary:', error)
    throw error
  }
}

export const deleteInvoiceSummary = async (passiveId: any) => {
  try {
    const response = await api.post(`/invoiceSummary/delete/${passiveId}`)
    return response.data
  } catch (error) {
    console.error('Error deleting invoiceSummary:', error)
    throw error
  }
}
