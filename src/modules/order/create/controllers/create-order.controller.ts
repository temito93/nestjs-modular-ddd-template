import { Body, Controller, Post } from '@nestjs/common';
import { ORDER_API_PREFIX } from '../../constants';
import { CreateOrderService } from '../create-order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import type { CreateOrderVo } from '../vo/create-order.vo';

@Controller(`${ORDER_API_PREFIX}/create`)
export class CreateOrderController {
  constructor(private readonly createOrderService: CreateOrderService) {}

  @Post()
  async create(@Body() dto: CreateOrderDto): Promise<CreateOrderVo> {
    return this.createOrderService.execute(dto);
  }
}
