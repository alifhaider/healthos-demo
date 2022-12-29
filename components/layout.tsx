import React from 'react'

type LayoutProps = {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <>{children}</>
      </main>
    </>
  )
}
