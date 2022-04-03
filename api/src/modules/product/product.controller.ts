import { wrap } from '@mikro-orm/core';
import { Request, Response } from 'express';
import { Product } from '../../db/entities/product/product.entity';

export const getProduct = async (request: Request, response: Response) => {
  // get query string sort_by
  // get query string order
  // if both are not undefined together parse orderBy into object
  // get All products from product table
  // return them using json format
  const sortElement = request.query.sort_by;
  const order = request.query.order;

  let orderBy = {};
  if (sortElement && order) {
    orderBy = { [String(sortElement)]: order };
  }

  const productArray = await request.em.find(Product, {}, { orderBy });
  response.json(productArray);
};

export const getProductById = async (request: Request, response: Response) => {
  // get id params as integer
  // find that product using id param
  // catch error if it has not been found and return NotFound
  // return product
  const productId = Number.parseInt(request.params.id!);
  try {
    const productFound = await request.em.findOneOrFail(Product, productId);

    response.json(productFound);
  } catch {
    response.sendStatus(404);
  }
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
  // catch error if it has not been found and return NotFound
  // delete that product using found reference
  // flush changes to database
  // return true

  const productId = Number.parseInt(request.params.id!);
  try {
    const productReference = await request.em.findOneOrFail(Product, productId);
    await request.em.remove(productReference).flush();
    response.json({ succes: true });
  } catch {
    response.sendStatus(404);
  }
};

export const updateProductById = async (
  request: Request,
  response: Response
) => {
  // Get param id as integer
  // Get product new data
  // Find entity by id
  // catch error if entity not found and return NOTFOUND
  // wrap entity in a helper
  // update entity fields
  // flush commit to database
  // retrurn entity

  const productId = Number.parseInt(request.params.id!);
  const productUpdateDTO = request.body;
  try {
    const productReference = await request.em.findOneOrFail(Product, productId);

    const updatedProduct = wrap(productReference).assign(productUpdateDTO);
    await request.em.persistAndFlush(updatedProduct);

    response.json(updatedProduct);
  } catch {
    response.sendStatus(404);
  }
};
