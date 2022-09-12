import {
  Controller,
  VERSION_NEUTRAL,
  Get,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AllProductsRequestQuery } from './request/all-products.request.query';
import { CreateProductRequestDTO } from './request/create-product.request.dto';

@Controller({ version: [VERSION_NEUTRAL, '1'], path: 'products' })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(@Query() query: AllProductsRequestQuery) {
    return this.productService.findAll(query);
  }

  @Post()
  create(@Body() data: CreateProductRequestDTO) {
    return this.productService.create(data);
  }
}
