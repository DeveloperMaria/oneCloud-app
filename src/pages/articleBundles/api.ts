import { api } from '../api/api'

export const getAllArticle = async () => {
  try {
    const response = await api.get('/article/')
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`Failed to fetch Article. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching Article:', error)
    throw error
  }
}

export const getAllBundle = async () => {
  try {
    const response = await api.get('/bundle/')
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`Failed to fetch Bundle. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching Bundle:', error)
    throw error
  }
}

export const addArticle = async (articleData: any) => {
  try {
    const response = await api.post('/article/add', articleData)

    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Failed to add a Article. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error adding Article:', error)
    throw error
  }
}

export const addBundle = async (bundleData: any) => {
  try {
    const response = await api.post('/bundle/add', bundleData)

    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Failed to add a Bundle. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error adding Bundle:', error)
    throw error
  }
}

export const updateArticle = async (articleId: any, newArticleData: any) => {
  try {
    const response = await api.post(`/article/update/${articleId}`, newArticleData)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Failed to update Article. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error updating Article:', error)
    throw error
  }
}
export const updateBundle = async (bundleId: any, newBundleData: any) => {
  try {
    const response = await api.post(`/bundle/update/${bundleId}`, newBundleData)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Failed to update Bundle. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error updating Bundle:', error)
    throw error
  }
}

export const deleteArticle = async (articleId: any) => {
    try {
      const response = await api.post(`/article/delete/${articleId}`)
      return response.data
    } catch (error) {
      console.error('Error deleting Article:', error)
      throw error
    }
  }
  export const deleteBundle = async (bundleId: any) => {
    try {
      const response = await api.post(`/bundle/delete/${bundleId}`)
      return response.data
    } catch (error) {
      console.error('Error deleting Bundle:', error)
      throw error
    }
  }