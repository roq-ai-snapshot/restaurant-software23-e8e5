import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { reviewsValidationSchema } from 'validationSchema/reviews';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getReviews();
    case 'POST':
      return createReviews();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getReviews() {
    const data = await prisma.reviews.findMany({});
    return res.status(200).json(data);
  }

  async function createReviews() {
    await reviewsValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.reviews.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
