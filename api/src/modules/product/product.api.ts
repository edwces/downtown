import { Router } from 'express';
import productController from './product.controller';

const product = Router();

product.get('/', productController.getHandler);
product.get('/:id', productController.getByIdHandler);

export default product;
