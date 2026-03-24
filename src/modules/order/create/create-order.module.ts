import { Module } from '@nestjs/common';
import { CountryStrategyModule } from '@app/common/country-strategy';
import { Country } from '@app/common/enums';
import { OrderSharedModule } from '../shared/order-shared.module';
import { CREATE_ORDER_BP, CREATE_ORDER_POLICY } from './constants';
import { TurkeyCreateOrderBp } from './bp/tr/turkey-create-order.bp';
import { TurkeyCreateOrderPolicy } from './policies/tr/turkey-create-order.policy';
import { CreateOrderService } from './create-order.service';
import { CreateOrderController } from './controllers/create-order.controller';

@Module({
  imports: [
    CountryStrategyModule.forFeature({
      imports: [OrderSharedModule],
      registrations: [
        {
          token: CREATE_ORDER_BP,
          strategies: { [Country.TR]: TurkeyCreateOrderBp },
        },
        {
          token: CREATE_ORDER_POLICY,
          strategies: { [Country.TR]: TurkeyCreateOrderPolicy },
        },
      ],
    }),
  ],
  controllers: [CreateOrderController],
  providers: [CreateOrderService],
})
export class CreateOrderModule {}
