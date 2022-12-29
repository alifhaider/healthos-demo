import * as React from 'react'
import { Layout } from '../../components/layout'
import { AuthContext } from '../../contexts/auth-context'

export default function CustomersPage() {
  const { user } = React.useContext(AuthContext)

  if (!user) return <Layout>Not logged in</Layout>
  if (user?.admin === false)
    return (
      <Layout>
        <h1>Please Login as admin</h1>
      </Layout>
    )
  return (
    <Layout>
      <h1>Customers</h1>
    </Layout>
  )
}
