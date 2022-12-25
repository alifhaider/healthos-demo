import * as React from 'react'
import Layout from '../components/layout'
import { useCart } from '../contexts/cartcontext'

export default function CartPage() {
  const { state, dispatch } = useCart()
  return (
    <Layout>
      <div>
        {state.products.map(product => {
          return (
            <div key={product.id}>
              <div>
                {product.title}
                <button
                  onClick={() => dispatch({ type: 'delete', payload: product })}
                >
                  Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}
