import { serialize } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { cookies } = req

  const jwt = cookies.siteToken

  if (!jwt) {
    return res.status(401).json({ message: 'Not logged in' })
  } else {
    const serialized = serialize('siteToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: -1,
      path: '/',
    })

    res.setHeader('Set-Cookie', serialized)
    return res.status(200).json({ message: 'Successfully Logged Out' })
  }
}
