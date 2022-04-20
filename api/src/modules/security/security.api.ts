import { Router } from 'express';
import authenticate from '../../middleware/authenticate.middleware';
import {
  getUserFromToken,
  loginUser,
  registerUser,
} from './security.controller';
import rateLimit from 'express-rate-limit';

const security = Router();

// first register sending dredentials
// login sending credentials
// on login/register send jwt access

const loginRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  message: 'Try again in 5 min',
  statusCode: 429,
});

security.post('/register', registerUser);
security.post('/login', loginRateLimiter, loginUser);
security.get('/me', authenticate, getUserFromToken);

export default security;
