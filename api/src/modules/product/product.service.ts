import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { CreateProductRequestDTO } from './request/create-product.request.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: EntityRepository<Product>,
  ) {}

  findAll() {
    return this.productRepository.findAll();
  }

  async create(data: CreateProductRequestDTO) {
    const product = this.productRepository.create(data);
    await this.productRepository.persistAndFlush(product);
  }
}
