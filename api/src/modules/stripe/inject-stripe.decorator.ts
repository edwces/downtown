import { Inject } from '@nestjs/common';
import { STRIPE_API_KEY } from './stripe.module';

export const InjectStripe = () => Inject(STRIPE_API_KEY);
