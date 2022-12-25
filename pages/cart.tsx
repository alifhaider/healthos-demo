import Image from 'next/image'
import * as React from 'react'
import Layout from '../components/layout'
import { useCart } from '../contexts/cart-context'

export default function CartPage() {
  const { state, dispatch } = useCart()
  return (
    <Layout>
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
            {state.products.map(product => {
              return (
                <>
                  <tr>
                    <td className="border border-slate-300  p-4 text-slate-500 flex items-center gap-8">
                      <Image
                        className="rounded-md w-20 h-20"
                        src={product.thumbnail}
                        alt={product.title}
                        width={100}
                        height={100}
                      />
                      <p>{product.title}</p>
                    </td>
                    <td className="border border-slate-300  p-4 text-slate-500 text-center">
                      {product.price}
                    </td>
                    <td className="border border-slate-300 p-4 text-center">
                      <button
                        onClick={() =>
                          dispatch({ type: 'delete', payload: product })
                        }
                        className="bg-orange-200 px-2 rounded-lg hover:bg-slate-700/20 text-slate-700 hover:text-orange-500 transition-all duration-200 font-semibold"
                      >
                        x
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
                  {state.products.reduce((acc, curr) => acc + curr.price, 0)}
                </strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  )
}
