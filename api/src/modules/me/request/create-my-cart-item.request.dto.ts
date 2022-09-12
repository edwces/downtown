import { OmitType } from '@nestjs/mapped-types';
import { CreateCartItemRequestDTO } from 'src/modules/cart/request/create-cart-item.request.dto';

export class CreateMyCartItemRequestDTO extends OmitType(
  CreateCartItemRequestDTO,
  ['ownerId'],
) {}
