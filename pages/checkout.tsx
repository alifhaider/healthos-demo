import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import Layout from '../components/layout'
import { AuthContext } from '../contexts/auth-context'
import { useCart } from '../contexts/cart-context'
import { getDiscountedPrice } from '../utils/misc'

export default function CheckoutPage() {
  const { isAuthenticated } = React.useContext(AuthContext)

  const { state, dispatch } = useCart()
  const { products } = state
  const router = useRouter()

  if (!isAuthenticated) {
    router.push('/login')
  }

  function handlePayment() {
    setTimeout(() => {
      alert('Payment Successful')

      dispatch({ type: 'DELETE_ALL_PRODUCTS' })
      router.push('/products')
    }, 3000)
  }

  return (
    <Layout>
      <div className="flex flex-col items-center gap-4 justify-center h-full">
        <p className="text-sm">
          If you are seeing this page it means you are logged in
        </p>

        <p>
          Your Bill: &nbsp;$
          <span className="text-orange-400 font-medium underline">
            {products.reduce(
              (acc, curr) =>
                acc + getDiscountedPrice(curr.price, curr.discountPercentage),
              0,
            )}
          </span>
        </p>

        <button
          className="bg-orange-400 text-white px-4 py-2 rounded-md"
          onClick={() => {
            handlePayment()
          }}
        >
          Make Payment
        </button>

        <Link
          href="/products"
          className="text-slate-500 hover:scale-105 hover:font-semibold hover:text-orange-400 transition-all"
        >
          Add more products to cart
        </Link>
      </div>
    </Layout>
  )
}
