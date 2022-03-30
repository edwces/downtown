import { Response, Request, NextFunction } from 'express';
import { ObjectSchema } from 'yup';
import { ObjectShape } from 'yup/lib/object';

type ValidateFunction = (
  request: Request,
  response: Response,
  next: NextFunction
) => Promise<void>;

export default function validate<T extends ObjectShape>(
  schema: ObjectSchema<T>
): ValidateFunction {
  return async (request: Request, response: Response, next: NextFunction) => {
    const validatedData = await schema.validate(request.body);
    request.body = validatedData;
    next();
  };
}
