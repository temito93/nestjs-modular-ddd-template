export { AppClsModule } from './app-cls.module';
export { AppClsService } from './app-cls.service';

export interface AppClsStore {
  traceId: string;
  [key: symbol]: unknown;
}
