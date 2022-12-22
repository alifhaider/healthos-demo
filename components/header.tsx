import Link from 'next/link'

const LINKS = [
  {
    dashboard: 'Dashboard',
  },
  { products: 'Products' },
  { cart: 'Cart' },
  { login: 'Log In' },
]

export default function Header() {
  return (
    <header className="shadow">
      <div className="max-w-7xl flex items-center justify-between mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold text-gray-900">
          HealthOS
        </Link>
        <nav>
          <ul className="flex">
            {LINKS.map(link => (
              <li key={Object.keys(link)[0]}>
                <Link
                  href={`/${
                    Object.keys(link)[0] === 'dashboard'
                      ? 'dashboard'
                      : Object.keys(link)[0]
                  }`}
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {Object.values(link)[0]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
