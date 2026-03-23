import { Module } from '@nestjs/common';
import { OrderDal } from './dal/order.dal';
import { OrderActionTrackerDal } from './dal/order-action-tracker.dal';
import { ORDER_DAL, ORDER_ACTION_TRACKER_DAL } from './constants';

@Module({
  providers: [
    {
      provide: ORDER_DAL,
      useClass: OrderDal,
    },
    {
      provide: ORDER_ACTION_TRACKER_DAL,
      useClass: OrderActionTrackerDal,
    },
  ],
  exports: [ORDER_DAL, ORDER_ACTION_TRACKER_DAL],
})
export class OrderSharedModule {}
