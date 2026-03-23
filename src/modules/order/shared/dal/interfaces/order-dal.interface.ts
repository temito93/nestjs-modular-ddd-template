import type { OrderStatus, OrderSubStatus } from '@app/generated/prisma';
import type { OrderEntity } from '../../entities/order.entity';

export interface CreateOrderParams {
  accountId: string;
  sourceCurrencyId: string;
  targetCurrencyId: string;
  sourceAmount: string;
  targetAmount: string;
  rate: string;
  status: OrderStatus;
  subStatus: OrderSubStatus;
  details: Record<string, unknown>;
}

export interface IOrderDal {
  create(params: CreateOrderParams): Promise<OrderEntity>;
}
