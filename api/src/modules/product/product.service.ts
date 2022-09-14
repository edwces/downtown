import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Product } from './product.entity';
import { AllProductsRequestQuery } from './request/all-products.request.query';
import { CreateProductRequestDTO } from './request/create-product.request.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: EntityRepository<Product>,
  ) {}

  async findAll(query: AllProductsRequestQuery) {
    if (query.ids) {
      const products = await this.productRepository.find({
        id: { $in: query.ids },
      });
      if (products.length !== query.ids.length)
        throw new BadRequestException('Invalid Ids were passed');
      return products;
    }

    return this.productRepository.findAll();
  }

  async create(data: CreateProductRequestDTO) {
    const product = this.productRepository.create(data);
    await this.productRepository.persistAndFlush(product);
  }
}
