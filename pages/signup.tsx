import React from 'react'
import Link from 'next/link'

const SignUp = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 border-2 px-4 py-6 rounded-md">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign Up to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="phone-number" className="sr-only">
                Phone Number
              </label>
              <input
                id="phone-number"
                name="phone"
                type="tel"
                pattern="[0-9]{11}"
                auto-complete="phone"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Phone Number"
                aria-labelledby="phone-number"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                auto-complete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={true}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-not-allowed disabled:bg-gray-500"
            >
              Sign up
            </button>
            <p className="text-center mt-2 text-sm text-red-400">
              Just By using{' '}
              <Link className="text-blue-500 text-underline" href="/login">
                &apos;Login&apos;
              </Link>{' '}
              you can create an Account
            </p>
          </div>
        </form>
      </div>
      <p className="mt-4 text-sm">
        Already have an ID? &nbsp;
        <Link href="/login">
          <span className="text-blue-600 underline">Sign In!</span>
        </Link>
      </p>
    </div>
  )
}

export default SignUp
