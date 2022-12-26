import type { NextApiRequest, NextApiResponse } from 'next'
import * as jose from 'jose'

const SECRET_KEY = process.env.SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { cookies } = req

  const jwt = cookies.siteToken

  if (!jwt) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  if (jwt) {
    try {
      const user = await jose.jwtVerify(
        jwt,
        new TextEncoder().encode(SECRET_KEY),
      )
      return res.status(200).json({ data: user })
    } catch (err) {
      return res.status(401).json({ message: err })
    }
  }
}
