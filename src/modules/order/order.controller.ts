import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { ORDER_API_PREFIX } from './constants';
import type { GetAllOrdersVo } from './vo/get-all-orders.vo';

@Controller(ORDER_API_PREFIX)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getAll(): GetAllOrdersVo {
    return this.orderService.getAll();
  }
}
