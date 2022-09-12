import { IsNumberString, IsString, Length } from 'class-validator';

export class CreateProductRequestDTO {
  @IsString() @Length(1, 30) readonly label: string;
  @IsNumberString() readonly price: number;
}
