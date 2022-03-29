import { Router } from 'express';
import {
  createProduct,
  deleteProductById,
  getProduct,
  getProductById,
} from './product.controller';

const product = Router();

product.get('/', getProduct);
product.get('/:id', getProductById);
product.post('/', createProduct);
product.delete('/:id', deleteProductById);

export default product;
