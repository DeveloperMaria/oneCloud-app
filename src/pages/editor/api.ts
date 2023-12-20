import { api } from '../api/api'

export const getAllEditorProfile = async () => {
  try {
    const response = await api.get('/editorProfile/')
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`Failed to fetch EditorProfile. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching EditorProfile:', error)
    throw error
  }
}
export const getAllPaymentMethod = async () => {
    try {
      const response = await api.get('/paymentMethod/')
      if (response.status === 200) {
        return response.data
      } else {
        throw new Error(`Failed to fetch payment Method. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error fetching paymentMethod:', error)
      throw error
    }
  }

export const getAllMorRates = async () => {
    try {
      const response = await api.get('/morRates/')
      if (response.status === 200) {
        return response.data
      } else {
        throw new Error(`Failed to fetch morRates. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error fetching morRates:', error)
      throw error
    }
  }

  export const getAllBillingGroup = async () => {
    try {
      const response = await api.get('/billingGroup/')
      if (response.status === 200) {
        return response.data
      } else {
        throw new Error(`Failed to fetch Billing Group. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error fetching Billing Group:', error)
      throw error
    }
  }
  export const getAllRate = async () => {
    try {
      const response = await api.get('/rate/')
      if (response.status === 200) {
        return response.data
      } else {
        throw new Error(`Failed to fetch Rate. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error fetching Rate:', error)
      throw error
    }
  }

export const addRate = async (rateData: any) => {
  try {
    const response = await api.post('/rate/add', rateData)

    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Failed to add a Rate. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error adding Rate:', error)
    throw error
  }
}
export const addPaymentMethod = async (paymentData: any) => {
    try {
      const response = await api.post('/paymentMethod/add', paymentData)
  
      if (response.status >= 200 && response.status < 300) {
        return response.data
      } else {
        throw new Error(`Failed to add a payment Method. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error adding payment Method:', error)
      throw error
    }
  }
export const addEditorProfile = async (EditorProfileData: any) => {
    try {
      const response = await api.post('/editorProfile/add', EditorProfileData)
  
      if (response.status >= 200 && response.status < 300) {
        return response.data
      } else {
        throw new Error(`Failed to add a EditorProfile. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error adding EditorProfile:', error)
      throw error
    }
  }
export const addBillingGroup = async (billingData: any) => {
    try {
      const response = await api.post('/billingGroup/add', billingData)
  
      if (response.status >= 200 && response.status < 300) {
        return response.data
      } else {
        throw new Error(`Failed to add a Billing Group. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error adding Billing Group:', error)
      throw error
    }
  }

  export const addMorRates = async (MorData: any) => {
    try {
      const response = await api.post('/morRates/add', MorData)
  
      if (response.status >= 200 && response.status < 300) {
        return response.data
      } else {
        throw new Error(`Failed to add a morRates. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error adding morRates:', error)
      throw error
    }
  }

export const updateRate = async (rateId: any, newRateData: any) => {
  try {
    const response = await api.post(`/rate/update/${rateId}`, newRateData)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Failed to update Rate. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error updating Rate:', error)
    throw error
  }
}
export const updatePaymentMethod = async (paymentId: any, newpaymnetData: any) => {
    try {
      const response = await api.post(`/paymentMethod/update/${paymentId}`, newpaymnetData)
      if (response.status >= 200 && response.status < 300) {
        return response.data
      } else {
        throw new Error(`Failed to update payment Method. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error updating payment Method:', error)
      throw error
    }
  }
export const updateEditorProfile = async (EditorProfileId: any, newEditorProfileIdData: any) => {
    try {
      const response = await api.post(`/editorProfile/update/${EditorProfileId}`, newEditorProfileIdData)
      if (response.status >= 200 && response.status < 300) {
        return response.data
      } else {
        throw new Error(`Failed to update EditorProfile. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error updating EditorProfile:', error)
      throw error
    }
  }
export const updateMorRates = async (morRatesId: any, newMorRatesData: any) => {
    try {
      const response = await api.post(`/morRates/update/${morRatesId}`, newMorRatesData)
      if (response.status >= 200 && response.status < 300) {
        return response.data
      } else {
        throw new Error(`Failed to update morRates. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error updating morRates:', error)
      throw error
    }
  }
  export const updateBillingGroup = async (billingId: any, newbillingData: any) => {
    try {
      const response = await api.post(`/billingGroup/update/${billingId}`, newbillingData)
      if (response.status >= 200 && response.status < 300) {
        return response.data
      } else {
        throw new Error(`Failed to update Billing Group. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error updating Billing Group:', error)
      throw error
    }
  }



