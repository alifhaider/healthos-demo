import { GetServerSidePropsContext } from 'next'

export default function ProductPage() {
  return (
    <div>
      <h1>Product Page</h1>
    </div>
  )
}
export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const id = context.params?.id
  if (!id) return
  const res = await fetch(`https://dummyjson.com/products/${id}`)
  const data = await res.json()
  if (!data) {
    return
  }
  return {
    props: { data },
  }
}
