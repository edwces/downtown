import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import mikroOrmConfig from './config/mikro-orm.config';

// TODO
// - Validate ENV VARS
// - Routes string in separate file
// - ? Does Services needs repository boilerplate
// - ? Services Interfaces

// DONE
// - Versioning

@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
