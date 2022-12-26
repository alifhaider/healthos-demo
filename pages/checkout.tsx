import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import Layout from '../components/layout'
import { AuthContext } from '../contexts/auth-context'

export default function CheckoutPage() {
  const { isAuthenticated, logout, error } = React.useContext(AuthContext)
  const router = useRouter()

  if (!isAuthenticated) {
    router.push('/login')
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold text-slate-500 mb-8">
          Checkout is not implemented yet 😔
        </h1>
        <Link
          href="/products"
          className="text-slate-500 hover:scale-105 hover:font-semibold hover:text-orange-400 transition-all"
        >
          Add some products to cart
        </Link>
      </div>
    </Layout>
  )
}
