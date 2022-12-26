import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

const SECRET_KEY = process.env.SECRET

export async function middleware(req: NextRequest) {
  const { cookies } = req
  const jwt = cookies.get('siteToken')?.value
  const url = req.nextUrl.clone().pathname

  if (url.includes('/login')) {
    if (jwt) {
      try {
        await jose.jwtVerify(jwt, new TextEncoder().encode(SECRET_KEY))

        return NextResponse.rewrite(new URL('/', req.nextUrl.href))
      } catch (err) {
        return NextResponse.next()
      }
    }
  }

  if (url.includes('/dashboard' || '/checkout')) {
    if (!jwt) {
      return NextResponse.rewrite(new URL('/login', req.nextUrl.href))
    }
    try {
      await jose.jwtVerify(jwt, new TextEncoder().encode(SECRET_KEY))

      return NextResponse.next()
    } catch (err) {
      return NextResponse.rewrite(new URL('/login', req.nextUrl.href))
    }
  }

  return NextResponse.next()
}
