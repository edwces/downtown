import { OmitType } from '@nestjs/mapped-types';
import { CreateCustomerRequestDTO } from '../../../modules/customer/request/create-customer.request.dto';

export class SignInCustomerRequestDTO extends OmitType(
  CreateCustomerRequestDTO,
  ['name', 'surname'],
) {}
