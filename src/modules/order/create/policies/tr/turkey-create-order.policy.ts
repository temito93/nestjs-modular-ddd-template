import { Injectable, Logger } from '@nestjs/common';
import type { CreateOrderDto } from '../../dto/create-order.dto';
import { BaseCreateOrderPolicy } from '../base/create-order.policy';

@Injectable()
export class TurkeyCreateOrderPolicy extends BaseCreateOrderPolicy {
  private readonly logger = new Logger(TurkeyCreateOrderPolicy.name);

  // eslint-disable-next-line @typescript-eslint/require-await
  protected async additionalValidation(dto: CreateOrderDto): Promise<void> {
    // TODO: KYT (Know Your Transaction) check — will be async when calling external KYT service
    this.logger.log(`KYT check stub for account ${dto.accountId} — skipping`);
  }
}
