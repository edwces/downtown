import { OmitType } from '@nestjs/mapped-types';
import { CreateCustomerRequestDTO } from '../../customer/request/create-customer.request.dto';

export class SignInRequestDTO extends OmitType(CreateCustomerRequestDTO, [
  'name',
  'surname',
]) {}
