import { api } from '../api/api'

export const getAllPartners = async () => {
  try {
    const response = await api.get('/partner/')
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`Failed to fetch partners. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching partners:', error)
    throw error
  }
}

export const addPartner = async (partnerData: any) => {
  try {
    const response = await api.post('/partner/add', partnerData)

    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Failed to add a partner. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error adding partner:', error)
    throw error
  }
}

export const updatePartner = async (partnerId: any, newPartnerData: any) => {
  try {
    const response = await api.post(`/partner/update/${partnerId}`, newPartnerData)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Failed to update partner. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error updating partner:', error)
    throw error
  }
}

export const deletePartner = async (partnerId: any) => {
  try {
    const response = await api.post(`/partner/delete/${partnerId}`)
    return response.data
  } catch (error) {
    console.error('Error deleting partner:', error)
    throw error
  }
}
