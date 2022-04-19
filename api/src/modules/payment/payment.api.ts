import { Router } from 'express';
import { createSession } from './payment.controller';

const payment = Router();

payment.post('/session', createSession);

export default payment;
