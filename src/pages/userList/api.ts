import { api } from '../api/api'

export const getAllUser = async () => {
  try {
    const response = await api.get('/auth/')
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`Failed to fetch users. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export const addUser = async (userData: any) => {
  try {

    const existingUsers = await getAllUser();
    const emailExists = existingUsers.some(user => user.email === userData.email);

    if (emailExists) {
      return null; 
    }
    const response = await api.post('/auth/register', userData)

    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Failed to add a user. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error adding user:', error)
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
