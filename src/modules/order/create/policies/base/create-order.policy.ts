import { BadRequestException } from '@nestjs/common';
import type { CreateOrderDto } from '../../dto/create-order.dto';
import type { ICreateOrderPolicy } from '../interfaces';

export abstract class BaseCreateOrderPolicy implements ICreateOrderPolicy {
  async validate(dto: CreateOrderDto): Promise<void> {
    this.validateCurrencies(dto);
    await this.additionalValidation(dto);
  }

  protected abstract additionalValidation(dto: CreateOrderDto): Promise<void>;

  private validateCurrencies(dto: CreateOrderDto): void {
    if (dto.sourceCurrencyId === dto.targetCurrencyId) {
      throw new BadRequestException(
        'Source and target currencies must be different',
      );
    }
  }
}
