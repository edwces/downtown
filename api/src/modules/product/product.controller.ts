import { Request, Response } from 'express';
import { Product } from '../../db/entities/product/product.entity';

export const getProduct = async (request: Request, response: Response) => {
  const productArray = await request.em.find(Product, {});
  response.json(productArray);
};

export const getProductById = async (request: Request, response: Response) => {
  const productFound = await request.em.findOne(Product, {
    id: Number.parseInt(request.params.id!),
  });
  response.json(productFound);
};

export const createProduct = async (request: Request, response: Response) => {
  const ProductDTO = request.body;
};

export const deleteProductById = async (
  request: Request,
  response: Response
) => {
  const productId = request.params.id!;
};
