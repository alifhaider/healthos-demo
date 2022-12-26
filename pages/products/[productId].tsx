import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import React from 'react'
import Layout from '../../components/layout'
import { TProduct } from '../../utils/types'
import { useCart } from '../../contexts/cart-context'
import { getDiscountedPrice } from '../../utils/misc'

export default function ProductPage({ product }: { product: TProduct }) {
  const { dispatch } = useCart()

  const [selectedImage, setSelectedImage] = React.useState<string>(
    product.thumbnail,
  )

  function handleImageClick(src: string) {
    setSelectedImage(src)
  }

  const allImages = [product.thumbnail, ...product.images]

  function handleCartClick(product: TProduct) {
    // dispatch({ type: 'add', payload: { ...product, quantity } })
    dispatch({ type: 'ADD_PRODUCT', payload: product })
  }

  return (
    <Layout>
      <div className="flex gap-10 w-full justify-center ">
        <div className="flex-1">
          <Image
            src={selectedImage}
            alt={product.title || 'Product Image'}
            className="w-[400px] h-[350px] object-contain rounded-xl border border-orange-200 p-1"
            width={300}
            height={200}
          />
          <div className="flex gap-4 mt-12">
            {allImages.map((image: string, index: number) => (
              <Image
                onClick={() => handleImageClick(image)}
                key={index}
                src={image}
                className="w-20 cursor-pointer hover:opacity-70 rounded-md border border-orange-200 p-1"
                alt={product.title || 'Product Image'}
                width={300}
                height={300}
              />
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-12">
          <h1 className="font-semibold text-orange-400 capitalize text-6xl">
            {product.title}
          </h1>
          <p className="text-lg text-gray-500">{product.description}</p>
          <div className="flex justify-between">
            <div className="flex items-center gap-5">
              <p className="text-4xl text-black font-bold">
                <span className="mr-2">$</span>
                {getDiscountedPrice(product.price, product.discountPercentage)}
              </p>
              <p className="bg-orange-100 text-orange-500 text-sm font-semibold p-1 rounded-lg">
                {product.discountPercentage}%
              </p>
            </div>
            <p className="text-gray-400 text-lg font-bold line-through">
              <span>${product.price}</span>
            </p>
          </div>
          <div className="flex gap-4 w-full">
            <button
              onClick={() => handleCartClick(product)}
              className="flex-auto bg-orange-400 text-white font-semibold text-lg p-3 rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const id = context.params?.productId
  const res = await fetch(`https://dummyjson.com/products/${id}`)
  const product = await res.json()
  if (!product) {
    return
  }
  return {
    props: {
      product,
    },
  }
}
