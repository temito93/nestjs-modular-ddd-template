import { Global, Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { v4 as uuidv4 } from 'uuid';
import type { FastifyRequest } from 'fastify';
import { AppClsService } from './app-cls.service';

@Global()
@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        setup: (cls, req: FastifyRequest) => {
          const traceId =
            (req.headers['x-trace-id'] as string | undefined) ?? uuidv4();
          cls.set('traceId', traceId);
        },
      },
    }),
  ],
  providers: [AppClsService],
  exports: [AppClsService],
})
export class AppClsModule {}
