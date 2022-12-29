import React from 'react'
import Link from 'next/link'
import { AuthContext } from '../contexts/auth-context'
import { useCart } from '../contexts/cart-context'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
const LINKS = [
  {
    dashboard: 'Dashboard',
  },
  { products: 'Products' },
  { cart: 'Cart', numberOfProducts: 0 },
]

export default function Header() {
  const { isAuthenticated, logout, user, error } = React.useContext(AuthContext)

  const { state } = useCart()
  return (
    <header className="shadow">
      <div className="max-w-7xl flex items-center justify-between mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold text-gray-900">
          HealthOS
        </Link>
        <nav>
          <ul className="flex items-center">
            {user && user.admin && (
              <PopupState variant="popover" popupId="demo-popup-menu">
                {popupState => (
                  <React.Fragment>
                    <Button variant="outlined" {...bindTrigger(popupState)}>
                      Navigate
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem onClick={popupState.close}>
                        <Link href="/admin/customers">Customers</Link>
                      </MenuItem>
                      <MenuItem onClick={popupState.close}>
                        <Link href="/admin/products">Products</Link>
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            )}
            {LINKS.map(link => (
              <li key={Object.keys(link)[0]}>
                <Link
                  href={`/${Object.keys(link)[0]}`}
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {Object.values(link)[0]}{' '}
                  {state.products.length !== 0 &&
                    Object.keys(link)[0] === 'cart' && (
                      <span className="bg-orange-400 text-white rounded-full px-2 py-1 text-xs font-bold">
                        {state.products.length}
                      </span>
                    )}
                </Link>
              </li>
            ))}

            {isAuthenticated ? (
              <li>
                <button
                  onClick={() => logout()}
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}
