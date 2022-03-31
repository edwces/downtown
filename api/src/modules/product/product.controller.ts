import { wrap } from '@mikro-orm/core';
import { Request, Response } from 'express';
import { Product } from '../../db/entities/product/product.entity';

export const getProduct = async (request: Request, response: Response) => {
  // get All products from product table
  // return them using json format
  const productArray = await request.em.find(Product, {});
  response.json(productArray);
};

export const getProductById = async (request: Request, response: Response) => {
  // get id params as integer
  // find that product using id param
  // throw error if it has not been found
  // return product
  const productId = Number.parseInt(request.params.id!);
  const productFound = await request.em.findOne(Product, {
    id: productId,
  });
  if (!productFound) throw new Error('Product has not been found');

  response.json(productFound);
};

export const createProduct = async (request: Request, response: Response) => {
  // get validated data
  // create new product using validated data
  // persist it in a database and flush the commit
  // return created product
  const productDTO = request.body;
  const newProduct = request.em.create(Product, productDTO);

  await request.em.persistAndFlush(newProduct);

  response.json(newProduct);
};

export const deleteProductById = async (
  request: Request,
  response: Response
) => {
  // get id param
  // find entity by id
  // throw error if it has not been found
  // delete that product using found reference
  // flush changes to database
  // return true

  const productId = Number.parseInt(request.params.id!);

  const productReference = await request.em.findOne(Product, { id: productId });
  if (!productReference) throw new Error('Product was not found');

  await request.em.remove(productReference).flush();

  response.json({ succes: true });
};

export const updateProductById = async (
  request: Request,
  response: Response
) => {
  // Get param id as integer
  // Get product new data
  // Find entity by id
  // throw error if entity not found
  // wrap entity in a helper
  // update entity fields
  // flush commit to database
  // retrurn entity

  const productId = Number.parseInt(request.params.id!);
  const productUpdateDTO = request.body;

  const productReference = await request.em.findOne(Product, { id: productId });
  if (!productReference) throw new Error('Product was not found');

  const updatedProduct = wrap(productReference).assign(productUpdateDTO);
  await request.em.persistAndFlush(updatedProduct);

  response.json(updatedProduct);
};
