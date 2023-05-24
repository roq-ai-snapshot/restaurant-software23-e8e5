import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { restaurantsValidationSchema } from 'validationSchema/restaurants';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getRestaurants();
    case 'POST':
      return createRestaurants();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getRestaurants() {
    const data = await prisma.restaurants.findMany({});
    return res.status(200).json(data);
  }

  async function createRestaurants() {
    await restaurantsValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.menu_categories?.length > 0) {
      const create_menu_categories = body.menu_categories;
      body.menu_categories = {
        create: create_menu_categories,
      };
    } else {
      delete body.menu_categories;
    }
    if (body?.orders?.length > 0) {
      const create_orders = body.orders;
      body.orders = {
        create: create_orders,
      };
    } else {
      delete body.orders;
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
    const data = await prisma.restaurants.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
