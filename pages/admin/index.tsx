import Link from 'next/link'
import { Layout } from '../../components/layout'

export default function AdminPage() {
  return (
    <Layout>
      <ul>
        <li>
          <Link
            className="text-orange-400 text-sm underline"
            href="/admin/customers"
          >
            Customers
          </Link>
          <Link
            className="text-orange-400 text-sm underline"
            href="/admin/products"
          >
            Products
          </Link>
        </li>
      </ul>
    </Layout>
  )
}
