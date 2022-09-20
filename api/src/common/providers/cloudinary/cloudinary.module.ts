import {
  DynamicModule,
  Global,
  InjectionToken,
  Module,
  OptionalFactoryDependency,
} from '@nestjs/common';
import { v2 } from 'cloudinary';

interface CloudinaryModuleOptions {
  key: string;
  secret: string;
  name: string;
}

interface CloudinaryAsyncModuleOptions {
  inject: (InjectionToken | OptionalFactoryDependency)[];
  useFactory: (
    ...args: any[]
  ) => Promise<CloudinaryModuleOptions> | CloudinaryModuleOptions;
}

export const CLOUDINARY_API_KEY = 'CLOUDINARY_API_KEY';

@Global()
@Module({})
export class CloudinaryModule {
  static forRoot({
    secret,
    key,
    name,
  }: CloudinaryModuleOptions): DynamicModule {
    return {
      module: CloudinaryModule,
      providers: [
        {
          provide: CLOUDINARY_API_KEY,
          useFactory: () => {
            v2.config({ cloud_name: name, api_key: key, api_secret: secret });
            return v2;
          },
        },
      ],
      exports: [CLOUDINARY_API_KEY],
    };
  }

  static forRootAsync({
    inject,
    useFactory,
  }: CloudinaryAsyncModuleOptions): DynamicModule {
    return {
      module: CloudinaryModule,
      providers: [
        {
          provide: CLOUDINARY_API_KEY,
          inject,
          useFactory: async (...args) => {
            v2.config(await useFactory(...args));
            return v2;
          },
        },
      ],
      exports: [CLOUDINARY_API_KEY],
    };
  }
}
