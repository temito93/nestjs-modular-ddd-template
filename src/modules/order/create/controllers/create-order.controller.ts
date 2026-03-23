import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderService } from '../create-order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import type { CreateOrderVo } from '../vo/create-order.vo';

@Controller('orders')
export class CreateOrderController {
  constructor(private readonly createOrderService: CreateOrderService) {}

  @Post()
  async create(@Body() dto: CreateOrderDto): Promise<CreateOrderVo> {
    return this.createOrderService.execute(dto);
  }
}
