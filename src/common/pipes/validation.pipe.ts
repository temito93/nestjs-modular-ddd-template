import {
  BadRequestException,
  type Logger,
  type ValidationPipeOptions,
} from '@nestjs/common';

const SENSITIVE_FIELDS = new Set(['password', 'token', 'secret', 'apiKey']);

export const getValidationPipeOptions = (
  logger: Logger,
): ValidationPipeOptions => ({
  whitelist: true,
  transform: true,
  forbidNonWhitelisted: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
  exceptionFactory: (errors) => {
    const errorReport = errors.map((err) => ({
      field: err.property,
      failedRules: Object.keys(err.constraints ?? {}),
    }));

    const safeFields = errorReport
      .filter((e) => !SENSITIVE_FIELDS.has(e.field))
      .map((e) => e.field);

    logger.error(
      `Validation failed: ${safeFields.length ? safeFields.join(', ') : '[sensitive fields]'}`,
      {
        details: errorReport.map((e) => ({
          field: SENSITIVE_FIELDS.has(e.field) ? '[redacted]' : e.field,
          failedRules: e.failedRules,
        })),
      },
    );

    return new BadRequestException(errorReport);
  },
});
