import { Inject, Injectable } from '@nestjs/common';
import type { ICreateOrderBp } from './bp/interfaces';
import { CREATE_ORDER_BP } from './constants';
import type { CreateOrderDto } from './dto/create-order.dto';
import type { CreateOrderVo } from './vo/create-order.vo';

@Injectable()
export class CreateOrderService {
  constructor(
    @Inject(CREATE_ORDER_BP)
    private readonly createOrderBp: ICreateOrderBp,
  ) {}

  async execute(dto: CreateOrderDto): Promise<CreateOrderVo> {
    return this.createOrderBp.execute(dto);
  }
}
