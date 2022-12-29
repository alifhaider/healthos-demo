import { Layout } from '../../components/layout'
import { InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { TProduct } from '../../utils/types'
import * as React from 'react'
import { useCart } from '../../contexts/cart-context'
import { getDiscountedPrice } from '../../utils/misc'

export default function Products({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { products } = data

  const { dispatch } = useCart()

  function handleCartClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    product: TProduct,
  ) {
    e.preventDefault()
    dispatch({ type: 'ADD_PRODUCT', payload: product })
  }
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white ">
        {products.map((product: TProduct) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="bg-white border rounded-md cursor-pointer h-full flex flex-col justify-between relative overflow-hidden hover:drop-shadow-md transition-all"
          >
            <Image
              width={300}
              height={40}
              className="w-full  h-40 object-cover hover:opacity-75 mb-2 rounded-t-md"
              src={product.thumbnail}
              alt={product.title}
            />
            <div className="p-2 flex flex-grow flex-col justify-between ">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">{product.title}</h4>
                <div className="leading-none">
                  <p className="text-red-500 font-medium text-md  ">
                    <span className="mr-1">$</span>
                    {getDiscountedPrice(
                      product.price,
                      product.discountPercentage,
                    )}
                  </p>
                  <span className="mr-1">$</span>
                  <span className="line-through text-sm">{product.price}</span>
                </div>
              </div>
              <p className="text-lime-700 text-sm">{product.description}</p>
              <button
                className="mt-4 bg-gray-400 text-white text-sm rounded-md px-4 py-2 hover:bg-orange-400 transition-all"
                onClick={e => handleCartClick(e, product)}
              >
                Add to Cart
              </button>
              <p className="absolute w-14 h-14 text-center -top-2 -right-2 bg-lime-300 p-2 rounded-full text-orange-500 leading-3">
                <span className="font-semibold text-lg">
                  {`${Math.floor(product.discountPercentage)}%`}
                </span>
                <br />
                <span className="text-xs">Off</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch(`https://dummyjson.com/products`)
  const data = await res.json()
  if (!data) {
    return
  }
  return {
    props: { data },
  }
}
