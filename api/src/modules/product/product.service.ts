import { EntityManager } from '@mikro-orm/core';
import { Product } from '../../db/entities/product/product.entity';
import ResponseError from '../../errors/response-error';
import { HTTP_STATUS } from '../../types/enums';

const getProductById = async (em: EntityManager, id: number) => {
  const product = await em.findOne(Product, id);
  if (!product)
    throw new ResponseError('Product not Found', HTTP_STATUS.NOT_FOUND);
  return product;
};

export default {
  getProductById,
};
