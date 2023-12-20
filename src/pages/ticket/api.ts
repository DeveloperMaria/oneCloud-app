import { api } from '../api/api'

export const getAllTicket = async () => {
  try {
    const response = await api.get('/ticketManagment/')
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`Failed to fetch Ticket. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching Ticket:', error)
    throw error
  }
}

export const addTicket = async (userData: any) => {
  try {
    const response = await api.post('/ticketManagment/add', userData)

    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Failed to add a Ticket. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error adding Ticket:', error)
    throw error
  }
}

export const updateTicket = async (ticketId: any, newUserData: any) => {
  try {
    const response = await api.post(`/ticketManagment/update/${ticketId}`, newUserData)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Failed to update Ticket. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error updating Ticket:', error)
    throw error
  }
}

export const deleteTicket = async (ticketId: any) => {
  try {
    const response = await api.post(`/ticketManagment/delete/${ticketId}`)
    return response.data
  } catch (error) {
    console.error('Error deleting Ticket:', error)
    throw error
  }
}
