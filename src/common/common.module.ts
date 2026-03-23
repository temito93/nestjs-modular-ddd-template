import { Module } from '@nestjs/common';
import { AppClsModule } from './cls';
import { TRANSLATION_SERVICE } from './interfaces/translation-service.interface';
import { TranslationService } from './services/translation.service';

@Module({
  imports: [AppClsModule],
  providers: [
    {
      provide: TRANSLATION_SERVICE,
      useClass: TranslationService,
    },
  ],
  exports: [TRANSLATION_SERVICE, AppClsModule],
})
export class CommonModule {}
