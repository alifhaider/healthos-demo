import Layout from '../../components/layout'
import { InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { TProduct } from '../../utils/types'
import * as React from 'react'
import { useCart } from '../../contexts/cartcontext'

export default function Products({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { products } = data
  const [hideDiscountBadge, setHideDiscountBadge] =
    React.useState<boolean>(false)

  const { dispatch } = useCart()

  function handleCartClick(product: TProduct) {
    dispatch({ type: 'add', payload: product })
  }
  return (
    <Layout>
      <h1>Products</h1>
      <button onClick={() => setHideDiscountBadge(!hideDiscountBadge)}>
        Hide Badge
      </button>
      <div className="grid grid-cols-4 gap-4 bg-white">
        {products.map((product: TProduct) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="bg-white border rounded-md cursor-pointer relative overflow-hidden hover:drop-shadow-md transition-all"
          >
            <Image
              width={300}
              height={40}
              className="w-full  h-40 object-cover hover:opacity-75 mb-2 rounded-t-md"
              src={product.thumbnail}
              alt={product.title}
            />
            <div className="p-2">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">{product.title}</h4>
                <div className="leading-none">
                  <p className="text-red-500 font-medium text-md  ">
                    <span className="mr-1">$</span>
                    {Math.floor(
                      product.price -
                        product.price * (product.discountPercentage / 100),
                    )}
                  </p>
                  <span className="mr-1">$</span>
                  <span className="line-through text-sm">{product.price}</span>
                </div>
              </div>
              <p className="text-lime-700 text-sm">{product.description}</p>
              <button onClick={() => handleCartClick(product)}>
                Add to Cart
              </button>
              {!hideDiscountBadge && (
                <p className="absolute w-14 h-14 text-center -top-2 -right-2 bg-lime-300 p-2 rounded-full text-orange-500 leading-3">
                  <span className="font-semibold text-lg">
                    {`${Math.floor(product.discountPercentage)}%`}
                  </span>
                  <br />
                  <span className="text-xs">Off</span>
                </p>
              )}
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
