import type { OrderActionTrackerStatus } from '@app/generated/prisma';
import type { OrderActionTrackerEntity } from '../../entities/order-action-tracker.entity';

export interface CreateTrackerParams {
  idempotencyKey: string;
  accountId: string;
  sourceCurrencyId: string;
  sourceAmount: string;
  targetCurrencyId: string;
  targetAmount: string;
  rate: string;
  status: OrderActionTrackerStatus;
}

export interface UpdateTrackerParams {
  status: OrderActionTrackerStatus;
  orderId?: string;
  errorMessage?: string;
  transactionRef?: string;
}

export interface IOrderActionTrackerDal {
  create(params: CreateTrackerParams): Promise<OrderActionTrackerEntity>;
  update(
    id: string,
    params: UpdateTrackerParams,
  ): Promise<OrderActionTrackerEntity>;
  delete(id: string): Promise<void>;
}
