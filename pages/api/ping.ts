import { NextApiRequest, NextApiResponse } from 'next';

export default (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).send({ success: true, message: 'Ping succesfull for API.' });
};
