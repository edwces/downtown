import { IsNumber } from 'class-validator';

export class CreateCartItemRequestDTO {
  @IsNumber() readonly ownerId: number;
  @IsNumber() readonly productId: number;
}
