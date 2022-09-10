import { IsNumberString } from 'class-validator';

export class CreateCartItemRequestDTO {
  @IsNumberString() readonly ownerId: number;
  @IsNumberString() readonly productId: number;
}
