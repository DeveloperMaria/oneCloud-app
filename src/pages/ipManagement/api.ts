import { api } from '../api/api'

export const getAllIP = async () => {
  try {
    const response = await api.get('/ip/')
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`Failed to fetch IP List. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching IP List:', error)
    throw error
  }
}
export const getAllNAS = async () => {
    try {
      const response = await api.get('/nas/')
      if (response.status === 200) {
        return response.data
      } else {
        throw new Error(`Failed to fetch NAS. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error fetching NAS:', error)
      throw error
    }
  }

export const getAllAccessPoint = async () => {
    try {
      const response = await api.get('/accessPoint/')
      if (response.status === 200) {
        return response.data
      } else {
        throw new Error(`Failed to fetch Access Point. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error fetching Access Point:', error)
      throw error
    }
  }

  export const getAllFirstName = async () => {
    try {
      const response = await api.get('/knots/firstName/')
      if (response.status === 200) {
        return response.data
      } else {
        throw new Error(`Failed to fetch First Name. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error fetching First Name:', error)
      throw error
    }
  }

  export const getAllIpAccessPoint = async () => {
    try {
      const response = await api.get('/accessPoint/ipAccessPoint/')
      if (response.status === 200) {
        return response.data
      } else {
        throw new Error(`Failed to fetch Ip AccessPoint. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error fetching Ip AccessPoint:', error)
      throw error
    }
  }

  export const getAllIpNas = async () => {
    try {
      const response = await api.get('/nas/ipNas/')
      if (response.status === 200) {
        return response.data
      } else {
        throw new Error(`Failed to fetch IpNAS. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error fetching IpNAS:', error)
      throw error
    }
  }

  export const getAllCondominiums = async () => {
    try {
      const response = await api.get('/condominiums/')
      if (response.status === 200) {
        return response.data
      } else {
        throw new Error(`Failed to fetch Condominiums. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error fetching Condominiums:', error)
      throw error
    }
  }
  export const getAllKnots = async () => {
    try {
      const response = await api.get('/knots/')
      if (response.status === 200) {
        return response.data
      } else {
        throw new Error(`Failed to fetch Knots. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error fetching Knots:', error)
      throw error
    }
  }

export const addKnots = async (ipData: any) => {
  try {
    const response = await api.post('/knots/add', ipData)

    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Failed to add a Knots. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error adding Knots:', error)
    throw error
  }
}
export const addNAS = async (ipData: any) => {
    try {
      const response = await api.post('/nas/add', ipData)
  
      if (response.status >= 200 && response.status < 300) {
        return response.data
      } else {
        throw new Error(`Failed to add a NAS. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error adding NAS:', error)
      throw error
    }
  }
export const addIPList = async (ipData: any) => {
    try {
      const response = await api.post('/ip/add', ipData)
  
      if (response.status >= 200 && response.status < 300) {
        return response.data
      } else {
        throw new Error(`Failed to add a IP List. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error adding IP List:', error)
      throw error
    }
  }
export const addCondominiums = async (ipData: any) => {
    try {
      const response = await api.post('/condominiums/add', ipData)
  
      if (response.status >= 200 && response.status < 300) {
        return response.data
      } else {
        throw new Error(`Failed to add a Condominiums. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error adding Condominiums:', error)
      throw error
    }
  }

  export const addAccessPoint = async (ipData: any) => {
    try {
      const response = await api.post('/accessPoint/add', ipData)
  
      if (response.status >= 200 && response.status < 300) {
        return response.data
      } else {
        throw new Error(`Failed to add a Access Point. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error adding Access Point:', error)
      throw error
    }
  }

export const updateknots = async (ipId: any, newIpData: any) => {
  try {
    const response = await api.post(`/knots/update/${ipId}`, newIpData)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Failed to update knots. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error updating knots:', error)
    throw error
  }
}
export const updateNAS = async (ipId: any, newIpData: any) => {
    try {
      const response = await api.post(`/nas/update/${ipId}`, newIpData)
      if (response.status >= 200 && response.status < 300) {
        return response.data
      } else {
        throw new Error(`Failed to update NAS. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error updating NAS:', error)
      throw error
    }
  }
export const updateIPList = async (ipId: any, newIpData: any) => {
    try {
      const response = await api.post(`/ip/update/${ipId}`, newIpData)
      if (response.status >= 200 && response.status < 300) {
        return response.data
      } else {
        throw new Error(`Failed to update IP List. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error updating IP List:', error)
      throw error
    }
  }
export const updateAccessPoint = async (ipId: any, newIpData: any) => {
    try {
      const response = await api.post(`/accessPoint/update/${ipId}`, newIpData)
      if (response.status >= 200 && response.status < 300) {
        return response.data
      } else {
        throw new Error(`Failed to update Access Point. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error updating Access Point:', error)
      throw error
    }
  }
  export const updateCondominiums = async (ipId: any, newIpData: any) => {
    try {
      const response = await api.post(`/condominiums/update/${ipId}`, newIpData)
      if (response.status >= 200 && response.status < 300) {
        return response.data
      } else {
        throw new Error(`Failed to update Condominiums. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error updating Condominiums:', error)
      throw error
    }
  }



