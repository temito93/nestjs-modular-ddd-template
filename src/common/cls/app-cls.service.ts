import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import type { AppClsStore } from './index';

@Injectable()
export class AppClsService {
  constructor(private readonly cls: ClsService<AppClsStore>) {}

  getTraceId(): string {
    return this.cls.get('traceId');
  }
}
