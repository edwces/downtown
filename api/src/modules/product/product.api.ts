import { Router } from 'express';
import safeThrow from '../../util/safeThrow';
import {
  createProduct,
  deleteProductById,
  getProduct,
  getProductById,
  updateProductById,
} from './product.controller';

const product = Router();

product.get('/', getProduct);
product.get('/:id', safeThrow(getProductById));
product.post('/', createProduct);
product.delete('/:id', safeThrow(deleteProductById));
product.put('/:id', safeThrow(updateProductById));

export default product;
