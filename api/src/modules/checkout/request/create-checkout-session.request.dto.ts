import { IsNumber, ValidateNested } from 'class-validator';

class CreateCheckoutItem {
  @IsNumber() id: number;
  @IsNumber() quantity: number;
}

export class CreateCheckoutSessionDTO {
  @ValidateNested()
  items: CreateCheckoutItem[];
}
