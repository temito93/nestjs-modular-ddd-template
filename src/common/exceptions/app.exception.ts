import { HttpException } from '@nestjs/common';
import { ErrorCodes } from './error-codes';
import type { ErrorCode } from './error-codes';

export class AppException extends HttpException {
  readonly errorCode: ErrorCode;
  readonly code: string;

  constructor(errorCode: ErrorCode) {
    const definition = ErrorCodes[errorCode];
    super(definition.message, definition.statusCode);
    this.errorCode = errorCode;
    this.code = definition.code;
  }
}
