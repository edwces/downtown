import { wrap } from '@mikro-orm/core';
import { NextFunction, Request, Response } from 'express';
import { Product } from '../../db/entities/product/product.entity';
import ResponseError from '../../errors/response-error';
import { HTTP_STATUS } from '../../types/enums';

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

export const getProductById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // get id params as integer
  // find that product using id param
  // catch error if it has not been found and return NotFound
  // return product
  const productId = Number.parseInt(request.params.id!);
  const productFound = await request.em.findOne(Product, productId);
  if (!productFound)
    return next(new ResponseError('Product not Found', HTTP_STATUS.NOT_FOUND));

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

  response.status(HTTP_STATUS.CREATED).json(newProduct);
};

export const deleteProductById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // get id param
  // find entity by id
  // catch error if it has not been found and return NotFound
  // delete that product using found reference
  // flush changes to database
  // return true

  const productId = Number.parseInt(request.params.id!);
  const productReference = await request.em.findOne(Product, productId);
  if (!productReference)
    return next(new ResponseError('Product not Found', HTTP_STATUS.NOT_FOUND));

  await request.em.remove(productReference).flush();
  response.json({ succes: true });
};

export const updateProductById = async (
  request: Request,
  response: Response,
  next: NextFunction
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

  const productReference = await request.em.findOne(Product, productId);
  if (!productReference)
    return next(new ResponseError('Product not Found', HTTP_STATUS.NOT_FOUND));

  const updatedProduct = wrap(productReference).assign(productUpdateDTO);
  await request.em.persistAndFlush(updatedProduct);

  response.json(updatedProduct);
};
