import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import Layout from '../components/layout'
import { useCart } from '../contexts/cart-context'
import { getDiscountedPrice } from '../utils/misc'

export default function CartPage() {
  const { state, dispatch } = useCart()
  const { products } = state
  return (
    <Layout>
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-3xl font-bold text-slate-500 mb-8">
            Cart is empty 😔
          </h1>
          <Link
            href="/products"
            className="text-slate-500 hover:scale-105 hover:font-semibold hover:text-orange-400 transition-all"
          >
            Add some products to cart
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <table className="table-auto border-separate border border-slate-500">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => {
                const { title, price, discountPercentage, thumbnail } = product
                return (
                  <>
                    <tr>
                      <td className="border border-slate-300  p-4 text-slate-500 flex items-center gap-8">
                        <Image
                          className="rounded-md w-20 h-20"
                          src={thumbnail}
                          alt={title}
                          width={100}
                          height={100}
                        />
                        <p>{title}</p>
                      </td>
                      <td className="border border-slate-300  p-4 text-slate-500 text-center">
                        {getDiscountedPrice(price, discountPercentage)}
                      </td>
                      <td className="border border-slate-300 p-4 text-center">
                        <button
                          title={`Remove ${title}`}
                          onClick={() =>
                            dispatch({ type: 'delete', payload: product })
                          }
                          className=" hover:bg-lime-400 transition-all  "
                        >
                          ❌
                        </button>
                      </td>
                    </tr>
                  </>
                )
              })}
              <tr>
                <td className="border border-slate-300  p-4 text-slate-500 text-center">
                  <strong>Total</strong>
                </td>
                <td className="border border-slate-300  p-4 text-slate-500 text-center">
                  <strong>
                    {state.products.reduce(
                      (acc, curr) =>
                        acc +
                        getDiscountedPrice(curr.price, curr.discountPercentage),
                      0,
                    )}
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-end">*Hover a while over REMOVE button</p>
          <Link href="/checkout" className="flex justify-center">
            <button className="px-8 py-4 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-all">
              Checkout
            </button>
          </Link>
        </div>
      )}
    </Layout>
  )
}
