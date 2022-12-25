import { createContext, useContext } from 'react'
import * as React from 'react'
import { TProduct } from '../utils/types'

type Props = {
  children: React.ReactNode
}

type CartState = {
  products: TProduct[]
  addProduct: (product: TProduct) => void
  deleteProduct: (product: TProduct) => void
}

export const CartContext = createContext<CartState>({
  products: [],
  addProduct: () => {},
  deleteProduct: () => {},
})

function addProduct(product: TProduct) {
  console.log('addProduct', product)
  // const cart = useContext(CartContext)
  // const updatedCart = [...cart.products, product]
  // setCart({ ...cart, products: updatedCart })
}

function deleteProduct(product: TProduct) {
  console.log('deleteProduct', product)
  // const [cart, setCart] = useContext(CartContext)
  // const updatedCart = cart.products.filter(item => item !== product)
  // setCart({ ...cart, products: updatedCart })
}

const initialCartState: CartState = {
  products: [],
  addProduct,
  deleteProduct,
}

export const CartProvider: React.FC<Props> = props => {
  const { children } = props
  const [cart, _] = React.useState(initialCartState)
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>
}
