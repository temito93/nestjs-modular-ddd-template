import { Module } from '@nestjs/common';
import { CreateOrderModule } from '@app/modules/order/create/create-order.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [CreateOrderModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
