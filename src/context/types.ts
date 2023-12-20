export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type UserDataType = {
  id: number
  email: string
  name: string
  password: string
  role:string
  active:boolean
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  register: (params: UserDataType, errorCallback?: ErrCallbackType) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}
