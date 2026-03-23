import { Injectable } from '@nestjs/common';
import { ErrorCodes } from '../exceptions/error-codes';
import type { ErrorCode } from '../exceptions/error-codes';
import type { ITranslationService } from '../interfaces/translation-service.interface';
import trErrors from '@app/i18n/tr/errors';
import geErrors from '@app/i18n/ge/errors';
import uzErrors from '@app/i18n/uz/errors';

const translationMap: Record<string, Record<ErrorCode, string>> = {
  tr: trErrors,
  ge: geErrors,
  uz: uzErrors,
};

@Injectable()
export class TranslationService implements ITranslationService {
  translate(errorCode: ErrorCode, lang: string): string {
    const langTranslations = translationMap[lang.toLowerCase()];
    const translation = langTranslations[errorCode];
    if (translation) {
      return translation;
    }

    return ErrorCodes[errorCode].message;
  }
}
