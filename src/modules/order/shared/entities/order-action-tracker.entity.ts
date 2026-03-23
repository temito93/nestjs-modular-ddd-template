import type { OrderActionTrackerStatus } from '@app/generated/prisma';

export class OrderActionTrackerEntity {
  readonly id: string;
  readonly idempotencyKey: string;
  readonly accountId: string;
  readonly sourceCurrencyId: string;
  readonly sourceAmount: string;
  readonly targetCurrencyId: string;
  readonly targetAmount: string;
  readonly rate: string;
  readonly transactionRef: string | null;
  readonly errorMessage: string | null;
  readonly status: OrderActionTrackerStatus;
  readonly orderId: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(params: {
    id: string;
    idempotencyKey: string;
    accountId: string;
    sourceCurrencyId: string;
    sourceAmount: string;
    targetCurrencyId: string;
    targetAmount: string;
    rate: string;
    transactionRef: string | null;
    errorMessage: string | null;
    status: OrderActionTrackerStatus;
    orderId: string | null;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = params.id;
    this.idempotencyKey = params.idempotencyKey;
    this.accountId = params.accountId;
    this.sourceCurrencyId = params.sourceCurrencyId;
    this.sourceAmount = params.sourceAmount;
    this.targetCurrencyId = params.targetCurrencyId;
    this.targetAmount = params.targetAmount;
    this.rate = params.rate;
    this.transactionRef = params.transactionRef;
    this.errorMessage = params.errorMessage;
    this.status = params.status;
    this.orderId = params.orderId;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
