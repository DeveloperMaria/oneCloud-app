import { api } from '../api/api'

export const getAllUser = async () => {
  try {
    const response = await api.get('/auth/')
    if (response.status === 200) {
      console.log('getData',response.data)
      return response.data
    } else {
      throw new Error(`Failed to fetch users. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}



export const updateUser = async (userId: any, newUserData: any) => {
  try {
    const response = await api.post(`/auth/update/${userId}`, newUserData)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Failed to update user. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}

export const deleteUser = async (userId: any) => {
  try {
    const response = await api.post(`/auth/delete/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}
