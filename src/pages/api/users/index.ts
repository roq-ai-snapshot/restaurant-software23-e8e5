import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { usersValidationSchema } from 'validationSchema/users';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getUsers();
    case 'POST':
      return createUsers();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getUsers() {
    const data = await prisma.users.findMany({});
    return res.status(200).json(data);
  }

  async function createUsers() {
    await usersValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.orders?.length > 0) {
      const create_orders = body.orders;
      body.orders = {
        create: create_orders,
      };
    } else {
      delete body.orders;
    }
    if (body?.restaurants?.length > 0) {
      const create_restaurants = body.restaurants;
      body.restaurants = {
        create: create_restaurants,
      };
    } else {
      delete body.restaurants;
    }
    if (body?.reviews?.length > 0) {
      const create_reviews = body.reviews;
      body.reviews = {
        create: create_reviews,
      };
    } else {
      delete body.reviews;
    }
    if (body?.staff_members?.length > 0) {
      const create_staff_members = body.staff_members;
      body.staff_members = {
        create: create_staff_members,
      };
    } else {
      delete body.staff_members;
    }
    const data = await prisma.users.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
