import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import * as cookie from 'cookie'

const SECRET_KEY = 'secret_very_long_key'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) {
    res.statusCode = 400
    res.end('Error: No request body')
    return
  }

  const { phone, password } = req.body
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      phone,
      password,
      admin: phone === '1111' && password === 'admin' ? true : false,
    },
    SECRET_KEY,
  )

  const serialized = cookie.serialize('siteToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  })

  res.setHeader('Set-Cookie', serialized)
  return res.status(200).json({ phone, token, password })
}
