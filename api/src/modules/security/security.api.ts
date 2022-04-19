import { Router } from 'express';
import authenticate from '../../middleware/authenticate.middleware';
import {
  getUserFromToken,
  loginUser,
  registerUser,
} from './security.controller';

const security = Router();

// first register sending dredentials
// login sending credentials
// on login/register send jwt access

security.post('/register', registerUser);
security.post('/login', loginUser);
security.get('/me', authenticate, getUserFromToken);

export default security;
