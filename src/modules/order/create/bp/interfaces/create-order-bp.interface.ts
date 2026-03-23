import type { CreateOrderDto } from '../../dto/create-order.dto';
import type { CreateOrderVo } from '../../vo/create-order.vo';

export interface ICreateOrderBp {
  execute(dto: CreateOrderDto): Promise<CreateOrderVo>;
}
