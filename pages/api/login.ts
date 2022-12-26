import type { NextApiRequest, NextApiResponse } from 'next'
import * as jose from 'jose'
import * as cookie from 'cookie'

const SECRET_KEY = process.env.SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!req.body) {
    res.statusCode = 400
    res.end('Error: No request body')
    return
  }

  const { phone, password } = req.body
  let admin = false
  if (phone === '1111' && password === 'admin') {
    admin = true
  }
  const jwtToken = await new jose.SignJWT({ phone, password, admin })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(new TextEncoder().encode(SECRET_KEY))

  const serialized = cookie.serialize('siteToken', jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  })

  res.setHeader('Set-Cookie', serialized)
  return res.status(200).json({ token: jwtToken })
}
