import { IsString, Length } from 'class-validator';

export class CreateProductRequestDTO {
  @IsString() @Length(1, 30) readonly label: string;
}
