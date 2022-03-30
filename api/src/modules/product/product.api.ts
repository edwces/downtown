import { Router } from 'express';
import validate from '../../middleware/validate.middleware';
import {
  createProduct,
  deleteProductById,
  getProduct,
  getProductById,
} from './product.controller';
import createProductSchema from './validators/create-product.validation';

const product = Router();

product.get('/', getProduct);
product.get('/:id', getProductById);
product.post('/', validate(createProductSchema), createProduct);
product.delete('/:id', deleteProductById);

export default product;
