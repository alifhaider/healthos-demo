import * as React from 'react'
import axios from 'axios'

interface AuthContextType {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  login: (phone: string, pass: string) => Promise<void>
  logout: () => Promise<void>
  error: string
  setError: React.Dispatch<React.SetStateAction<string>>
}

const initialState: AuthContextType = {
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  error: '',
  setError: () => {},
}

const AuthContext = React.createContext<AuthContextType>(initialState)

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    initialState.isAuthenticated,
  )
  const [error, setError] = React.useState(initialState.error)

  const login = async (phone: string, pass: string) => {
    try {
      const response = await axios.post('/api/login', { phone, pass })
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

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
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
