import { Inject, Injectable } from '@nestjs/common';
import { OrderStatus, OrderSubStatus } from '@app/generated/prisma';
import type { IOrderDal } from '@app/modules/order/shared/dal/interfaces';
import type { IOrderActionTrackerDal } from '@app/modules/order/shared/dal/interfaces';
import {
  ORDER_DAL,
  ORDER_ACTION_TRACKER_DAL,
} from '@app/modules/order/shared/constants';
import type { ICreateOrderPolicy } from '../../policies/interfaces';
import { CREATE_ORDER_POLICY } from '../../constants';
import { AppClsService } from '@app/common/cls';
import { BaseCreateOrderBp } from '../base/create-order.bp';

@Injectable()
export class TurkeyCreateOrderBp extends BaseCreateOrderBp {
  constructor(
    @Inject(ORDER_DAL) orderDal: IOrderDal,
    @Inject(ORDER_ACTION_TRACKER_DAL) trackerDal: IOrderActionTrackerDal,
    @Inject(CREATE_ORDER_POLICY) policy: ICreateOrderPolicy,
    appClsService: AppClsService,
  ) {
    super(orderDal, trackerDal, policy, appClsService);
  }

  protected getInitialStatus(): OrderStatus {
    return OrderStatus.INITIATED;
  }

  protected getInitialSubStatus(): OrderSubStatus {
    return OrderSubStatus.AWAITING_ADMIN_APPROVAL;
  }
}
