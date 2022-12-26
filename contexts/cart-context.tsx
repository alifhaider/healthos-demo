import * as React from 'react'
import { TProduct } from '../utils/types'

type Action = { type: 'add' | 'delete'; payload: TProduct }
type Dispatch = (action: Action) => void
type State = { products: TProduct[] }
type CartProviderProps = {
  children: React.ReactNode
}

const CartContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined)

function CartReducer(state: State, action: Action) {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        products: [...state.products, action.payload],
      }
    case 'delete':
      return {
        ...state,
        products: state.products.filter(item => item !== action.payload),
      }
    default:
      return state
  }
}

function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = React.useReducer(CartReducer, {
    products: [],
  })
  const value = { state, dispatch }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

function useCart() {
  const context = React.useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export { CartProvider, useCart }
