import { createContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'
import toast from 'react-hot-toast'

const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  register: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const storedUserData = window.localStorage.getItem('userData')
    if (storedUserData) {
      setUser(JSON.parse(storedUserData))
    }
    setLoading(false)
  }, [])

  const handleRegister = async (params: UserDataType, errorCallback?: ErrCallbackType) => {
    try {
      params.role = 'admin'

      const registerResponse = await axios.post('http://localhost:5000/auth/register', params)

      await handleLogin({ email: params.email, password: params.password })
      return registerResponse.data.token
    } catch (err: any) {
      if (errorCallback) errorCallback(err)
      throw err
    }
  }

  const handleLogin = async (params: LoginParams, errorCallback?: ErrCallbackType) => {
    try {
      const loginResponse = await axios.post('http://localhost:5000/auth/login', params)
      const { token, user } = loginResponse.data

      const expiration = new Date()
      expiration.setTime(expiration.getTime() + 1 * 24 * 60 * 60 * 1000) 

      window.localStorage.setItem('token', token)
      window.localStorage.setItem('userData', JSON.stringify(user))
      window.localStorage.setItem('tokenExpiry', expiration.getTime().toString())

      setUser(user)

      router.push('/home')
      toast.success('Login successful!')
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'An error occurred'
      toast.error(errorMessage)

      if (errorCallback) errorCallback(error)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('tokenExpiry')

    router.push('/login') 
  }

  const checkTokenExpiration = () => {
    const tokenExpiration = parseInt(window.localStorage.getItem('tokenExpiry') || '0', 10)
    const currentTime = Date.now() 

    if (tokenExpiration < currentTime) {
      handleLogout() 
    }
  }

  useEffect(() => {
    checkTokenExpiration() 

    const interval = setInterval(checkTokenExpiration, 60000) 

    return () => clearInterval(interval) 
  }, [])

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    register: handleRegister,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
