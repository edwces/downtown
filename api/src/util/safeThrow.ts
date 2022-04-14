import { NextFunction, Request, Response } from 'express';

type ExpressHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => Promise<void>;

export default function safeThrow(function_: ExpressHandler) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      await function_(request, response, next);
    } catch (error) {
      next(error);
    }
  };
}
