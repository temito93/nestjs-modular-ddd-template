import type { OrderStatus, OrderSubStatus } from '@app/generated/prisma';

export class CreateOrderVo {
  readonly id: string;
  readonly accountId: string;
  readonly sourceCurrencyId: string;
  readonly targetCurrencyId: string;
  readonly sourceAmount: string;
  readonly targetAmount: string;
  readonly rate: string;
  readonly status: OrderStatus;
  readonly subStatus: OrderSubStatus;
  readonly createdAt: Date;

  constructor(params: {
    id: string;
    accountId: string;
    sourceCurrencyId: string;
    targetCurrencyId: string;
    sourceAmount: string;
    targetAmount: string;
    rate: string;
    status: OrderStatus;
    subStatus: OrderSubStatus;
    createdAt: Date;
  }) {
    this.id = params.id;
    this.accountId = params.accountId;
    this.sourceCurrencyId = params.sourceCurrencyId;
    this.targetCurrencyId = params.targetCurrencyId;
    this.sourceAmount = params.sourceAmount;
    this.targetAmount = params.targetAmount;
    this.rate = params.rate;
    this.status = params.status;
    this.subStatus = params.subStatus;
    this.createdAt = params.createdAt;
  }
}
