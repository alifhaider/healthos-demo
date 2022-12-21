import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const KEY = 'secret_very_long_key';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) {
    res.statusCode = 400;
    res.end('Error: No request body');
    return;
  }

  const { phone, password } = req.body;
  const token = jwt.sign(
    {
      phone,
      admin: password === 'admin' && phone === 1111 ? true : false,
    },
    KEY
  );
  return res.status(200).json({ phone, token });
}
