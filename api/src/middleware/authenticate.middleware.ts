import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { HTTP_STATUS } from '../types/enums';

export default function authenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // if token was not send return response
  // if token is not good return response
  if (!request.headers.authorization)
    return response.status(HTTP_STATUS.FORBIDDEN).send('User is not logged in');

  const bearer = request.headers.authorization;
  const token = bearer.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.jwt.secret!) as JwtPayload;

    response.locals.user = {
      id: decoded.id,
      name: decoded.username,
      email: decoded.email,
    };
    next();
  } catch {
    return response.status(HTTP_STATUS.FORBIDDEN).send('Send token is invalid');
  }
}
