import { Controller, VERSION_NEUTRAL, Get, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductRequestDTO } from './request/create-product.request.dto';

@Controller({ version: [VERSION_NEUTRAL, '1'], path: 'products' })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Post()
  create(@Body() data: CreateProductRequestDTO) {
    return this.productService.create(data);
  }
}
