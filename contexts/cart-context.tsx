import * as React from 'react'
import { TProduct } from '../utils/types'

//only addproduct and deleteproduct can have a payload

type Action =
  | { type: 'ADD_PRODUCT'; payload: TProduct }
  | { type: 'DELETE_PRODUCT'; payload: TProduct }
  | { type: 'DELETE_ALL_PRODUCTS' }

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
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
      }
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(item => item !== action.payload),
      }

    case 'DELETE_ALL_PRODUCTS':
      return {
        ...state,
        products: [],
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
