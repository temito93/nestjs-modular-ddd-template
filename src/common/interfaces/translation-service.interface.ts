import type { ErrorCode } from '../exceptions/error-codes';

export interface ITranslationService {
  translate(errorCode: ErrorCode, lang: string): string;
}

export const TRANSLATION_SERVICE = Symbol('TRANSLATION_SERVICE');
