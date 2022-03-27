import { Request, Response } from 'express';
import { Product } from '../../db/entities/product/product.entity';

const getHandler = async (request: Request, response: Response) => {
  const productArray = await request.em.find(Product, {});
  response.json(productArray);
};

const getByIdHandler = async (request: Request, response: Response) => {
  const productFound = await request.em.findOne(Product, {
    id: Number.parseInt(request.params.id!),
  });
  response.json(productFound);
};

export default {
  getHandler,
  getByIdHandler,
};
