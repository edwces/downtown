import { Router } from 'express';
import { registerUser } from './security.controller';

const security = Router();

// first register sending dredentials
// login sending credentials
// on login/register send jwt access

security.post('/register', registerUser);
// security.post('/login');

export default security;
