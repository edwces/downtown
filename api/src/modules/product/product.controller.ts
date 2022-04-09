import { wrap } from '@mikro-orm/core';
import { Request, Response } from 'express';
import { Product } from '../../db/entities/product/product.entity';
import { HTTP_STATUS } from '../../types/enums';
import productService from './product.service';

export const getProduct = async (request: Request, response: Response) => {
  const sortColumn = request.query.sort_by;
  const orderDirection = request.query.order;

  let orderBy = {};
  if (sortColumn && orderDirection) {
    orderBy = { [String(sortColumn)]: orderDirection };
  }
  const products = await request.em.find(Product, {}, { orderBy });

  response.json(products);
};

export const getProductById = async (request: Request, response: Response) => {
  const id = Number.parseInt(request.params.id!);

  const product = await productService.getProductById(request.em, id);

  response.json(product);
};

export const createProduct = async (request: Request, response: Response) => {
  const productData = request.body;

  const product = request.em.create(Product, productData);
  await request.em.persistAndFlush(product);

  response.status(HTTP_STATUS.CREATED).json(product);
};

export const deleteProductById = async (
  request: Request,
  response: Response
) => {
  const id = Number.parseInt(request.params.id!);

  const product = await productService.getProductById(request.em, id);
  await request.em.removeAndFlush(product);

  response.json({ succes: true });
};

export const updateProductById = async (
  request: Request,
  response: Response
) => {
  const id = Number.parseInt(request.params.id!);
  const productData = request.body;

  const product = await productService.getProductById(request.em, id);
  wrap(product).assign(productData);
  await request.em.flush();

  response.json(product);
};
