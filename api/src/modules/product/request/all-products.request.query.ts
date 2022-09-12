import { Type, Transform } from 'class-transformer';
import { IsArray, IsOptional, IsNumberString } from 'class-validator';

export class AllProductsRequestQuery {
  @IsOptional()
  @IsArray()
  @IsNumberString({ each: true })
  @Type(() => Number)
  @Transform(({ value }) => value.split(','))
  readonly ids: number[];
}
