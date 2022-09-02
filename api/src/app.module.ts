import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import mikroOrmConfig from './config/mikro-orm.config';
import { CustomerModule } from './modules/customer/customer.module';
import { ProductModule } from './modules/product/product.module';

// TODO
// - Validate ENV VARS
// - Routes string in separate file
// - ? Does Services needs repository boilerplate
// - ? Services Interfaces
// - ? Migrations for local dev

// DONE
// - Versioning

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    CustomerModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
