import { Catch, HttpException, Logger } from '@nestjs/common';
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { AppException } from '../exceptions/app.exception';
import { ErrorCodes } from '../exceptions/error-codes';
import type { ITranslationService } from '../interfaces/translation-service.interface';
import type { AppConfig } from '@app/config/app.config';
import { AppClsService } from '../cls';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);
  private readonly SUPPORTED_LANGUAGES = new Set(['tr', 'ge', 'uz']);

  constructor(
    private readonly translationService: ITranslationService,
    private readonly appConfig: AppConfig,
    private readonly appClsService: AppClsService,
  ) {}

  async catch(exception: unknown, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const lang = this.resolveLanguage(request);
    const traceId = this.appClsService.getTraceId();

    if (exception instanceof AppException) {
      const message = this.translationService.translate(
        exception.errorCode,
        lang,
      );

      await reply.status(exception.getStatus()).send({
        success: false,
        traceId,
        code: exception.code,
        errorCode: exception.errorCode,
        error: message,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    if (exception instanceof HttpException) {
      const response = exception.getResponse();

      await reply.status(exception.getStatus()).send({
        success: false,
        traceId,
        code: ErrorCodes.VALIDATION_FAILED.code,
        errorCode: 'VALIDATION_FAILED',
        error: this.translationService.translate('VALIDATION_FAILED', lang),
        details:
          typeof response === 'object' && response !== null
            ? response
            : undefined,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    this.logger.error(
      'Unhandled exception',
      exception instanceof Error ? exception.stack : String(exception),
    );

    await reply.status(ErrorCodes.INTERNAL_SERVER_ERROR.statusCode).send({
      success: false,
      traceId,
      code: ErrorCodes.INTERNAL_SERVER_ERROR.code,
      errorCode: 'INTERNAL_SERVER_ERROR',
      error: this.translationService.translate('INTERNAL_SERVER_ERROR', lang),
      timestamp: new Date().toISOString(),
    });
  }

  private resolveLanguage(request: FastifyRequest): string {
    const acceptLanguage = request.headers['accept-language'];

    if (acceptLanguage) {
      const lang = acceptLanguage
        .split(',')[0]
        ?.split('-')[0]
        ?.trim()
        .toLowerCase();
      if (lang && this.SUPPORTED_LANGUAGES.has(lang)) {
        return lang;
      }
    }

    const countryLang = this.appConfig.country.toLowerCase();
    if (this.SUPPORTED_LANGUAGES.has(countryLang)) {
      return countryLang;
    }

    return 'tr';
  }
}
