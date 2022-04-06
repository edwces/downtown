import { HTTP_STATUS } from '../types/enums';

export default class ResponseError extends Error {
  status: HTTP_STATUS;

  constructor(message: string, status: HTTP_STATUS) {
    super(message);

    Object.setPrototypeOf(this, ResponseError.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ResponseError);
    }
    this.status = status;
  }
}
