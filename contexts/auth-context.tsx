import * as React from 'react'
import axios from 'axios'
import * as jose from 'jose'
import * as cookie from 'cookie'
import { GetServerSideProps } from 'next'
import { TUser } from '../utils/types'

interface AuthContextType {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  user: TUser | null
  login: (phone: string, pass: string) => Promise<void>
  logout: () => Promise<void>
  error: string
  setError: React.Dispatch<React.SetStateAction<string>>
}

interface AuthProviderProps {
  children: React.ReactNode
}

const initialState: AuthContextType = {
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  error: '',
  setError: () => {},
}

const AuthContext = React.createContext<AuthContextType>(initialState)

function AuthContextProvider(
  props: React.PropsWithChildren<AuthProviderProps>,
) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    initialState.isAuthenticated,
  )
  const [user, setUser] = React.useState(initialState.user)
  const [error, setError] = React.useState(initialState.error)
  const { children } = props

  const login = async (phone: string, password: string) => {
    try {
      const response = await axios.post('/api/login', { phone, password })
      const token = response.data.user
      localStorage.setItem('siteToken', token)
      setIsAuthenticated(true)
    } catch (e) {
      setError('An error occurred while logging in')
    }
  }

  const logout = async () => {
    try {
      await axios.get('/api/logout')
      setIsAuthenticated(false)
    } catch (e) {
      setError('An error occurred while logging out')
    }
  }

  React.useEffect(() => {
    if (!isAuthenticated) {
      setIsAuthenticated(false)
      setUser(null)
    }
    if (isAuthenticated) {
      axios.get('/api/user').then(res => {
        if (res.data) {
          const user = res.data.user.payload
          setUser(user)
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      })
    }
  }, [isAuthenticated])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        user,
        logout,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }
