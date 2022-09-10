import { Controller, VERSION_NEUTRAL } from '@nestjs/common';

@Controller({ version: [VERSION_NEUTRAL, '1'], path: 'cart' })
export class CartController {}
