import { OmitType } from '@nestjs/mapped-types';
import { RemoveCartItemRequestDTO } from 'src/modules/cart/request/remove-cart-item.request.dto';

export class RemoveMyCartItemRequestDTO extends OmitType(
  RemoveCartItemRequestDTO,
  ['ownerId'],
) {}
