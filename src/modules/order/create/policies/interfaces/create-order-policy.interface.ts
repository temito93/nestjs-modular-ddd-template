import type { CreateOrderDto } from '../../dto/create-order.dto';

export interface ICreateOrderPolicy {
  validate(dto: CreateOrderDto): Promise<void>;
}
