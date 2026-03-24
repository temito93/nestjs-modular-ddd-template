import { Injectable } from '@nestjs/common';
import type { GetAllOrdersVo } from './vo/get-all-orders.vo';

@Injectable()
export class OrderService {
  getAll(): GetAllOrdersVo {
    return { orders: ['orders'] };
  }
}
