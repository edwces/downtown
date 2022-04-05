import { Router } from 'express';
import { loginUser, registerUser } from './security.controller';

const security = Router();

// first register sending dredentials
// login sending credentials
// on login/register send jwt access

security.post('/register', registerUser);
security.post('/login', loginUser);

export default security;
