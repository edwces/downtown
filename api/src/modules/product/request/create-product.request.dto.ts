import {
  IsNumberString,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

class CreateProductImageRequestDTO {
  @IsString() @Length(1, 70) readonly path: string;
}

export class CreateProductRequestDTO {
  @IsString() @Length(1, 30) readonly label: string;
  @IsNumberString() readonly price: number;
  @ValidateNested() readonly image: CreateProductImageRequestDTO;
}
