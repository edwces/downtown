import { IsEmail, IsString, Length } from 'class-validator';

export class CreateCustomerRequestDTO {
  @IsEmail() readonly email: string;
  @IsString() @Length(5, 50) readonly password: string;
  @IsString() @Length(1, 40) readonly name: string;
  @IsString() @Length(1, 40) readonly surname: string;
}
