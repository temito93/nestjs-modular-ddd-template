import { Inject, Logger } from '@nestjs/common';
import { OrderActionTrackerStatus } from '@app/generated/prisma';
import type { OrderStatus, OrderSubStatus } from '@app/generated/prisma';
import type { IOrderDal } from '@app/modules/order/shared/dal/interfaces';
import type { IOrderActionTrackerDal } from '@app/modules/order/shared/dal/interfaces';
import {
  ORDER_DAL,
  ORDER_ACTION_TRACKER_DAL,
} from '@app/modules/order/shared/constants';
import type { CreateOrderDto } from '../../dto/create-order.dto';
import { CreateOrderVo } from '../../vo/create-order.vo';
import type { ICreateOrderPolicy } from '../../policies/interfaces';
import { CREATE_ORDER_POLICY } from '../../constants';
import { AppException } from '@app/common/exceptions';
import { AppClsService } from '@app/common/cls';
import type { ICreateOrderBp } from '../interfaces';

export abstract class BaseCreateOrderBp implements ICreateOrderBp {
  protected readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(ORDER_DAL)
    protected readonly orderDal: IOrderDal,
    @Inject(ORDER_ACTION_TRACKER_DAL)
    protected readonly trackerDal: IOrderActionTrackerDal,
    @Inject(CREATE_ORDER_POLICY)
    protected readonly policy: ICreateOrderPolicy,
    protected readonly appClsService: AppClsService,
  ) {}

  protected abstract getInitialStatus(): OrderStatus;
  protected abstract getInitialSubStatus(): OrderSubStatus;

  async execute(dto: CreateOrderDto): Promise<CreateOrderVo> {
    const tracker = await this.initializeTracker(dto);

    await this.policy.validate(dto);

    await this.deductWalletBalance(dto, tracker.id);

    const order = await this.persistOrder(dto, tracker.id);

    await this.trackerDal.update(tracker.id, {
      status: OrderActionTrackerStatus.COMPLETED,
      orderId: order.id,
    });

    await this.trackerDal.delete(tracker.id);

    return new CreateOrderVo({
      id: order.id,
      accountId: order.accountId,
      sourceCurrencyId: order.sourceCurrencyId,
      targetCurrencyId: order.targetCurrencyId,
      sourceAmount: order.sourceAmount,
      targetAmount: order.targetAmount,
      rate: order.rate,
      status: order.status,
      subStatus: order.subStatus,
      createdAt: order.createdAt,
    });
  }

  private async initializeTracker(dto: CreateOrderDto) {
    return this.trackerDal.create({
      idempotencyKey: dto.idempotencyKey,
      accountId: dto.accountId,
      sourceCurrencyId: dto.sourceCurrencyId,
      sourceAmount: dto.sourceAmount,
      targetCurrencyId: dto.targetCurrencyId,
      targetAmount: dto.targetAmount,
      rate: dto.rate,
      status: OrderActionTrackerStatus.INITIALIZED,
    });
  }

  private async deductWalletBalance(
    dto: CreateOrderDto,
    trackerId: string,
  ): Promise<void> {
    try {
      // TODO: Call wallet service v2 to deduct balance
      this.logger.log(
        `Wallet deduction stub for account ${dto.accountId}, amount ${dto.sourceAmount}`,
      );

      await this.trackerDal.update(trackerId, {
        status: OrderActionTrackerStatus.WALLET_DEDUCTED,
      });
    } catch (error) {
      await this.trackerDal.update(trackerId, {
        status: OrderActionTrackerStatus.FAILED_WALLET_ERROR,
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
      });

      this.logger.error(
        `Wallet deduction failed for account ${dto.accountId}`,
        error instanceof Error ? error.stack : String(error),
        { traceId: this.appClsService.getTraceId() },
      );

      throw new AppException('WALLET_DEDUCTION_FAILED');
    }
  }

  private async persistOrder(dto: CreateOrderDto, trackerId: string) {
    try {
      return await this.orderDal.create({
        accountId: dto.accountId,
        sourceCurrencyId: dto.sourceCurrencyId,
        targetCurrencyId: dto.targetCurrencyId,
        sourceAmount: dto.sourceAmount,
        targetAmount: dto.targetAmount,
        rate: dto.rate,
        status: this.getInitialStatus(),
        subStatus: this.getInitialSubStatus(),
        details: {},
      });
    } catch (error) {
      await this.trackerDal.update(trackerId, {
        status: OrderActionTrackerStatus.FAILED_LOCAL_ORDER_ERROR,
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
      });

      this.logger.error(
        `Order persistence failed for account ${dto.accountId}`,
        error instanceof Error ? error.stack : String(error),
        { traceId: this.appClsService.getTraceId() },
      );

      throw new AppException('ORDER_CREATE_FAILED');
    }
  }
}
