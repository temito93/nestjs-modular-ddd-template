import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  accountId!: string;

  @IsUUID()
  @IsNotEmpty()
  sourceCurrencyId!: string;

  @IsUUID()
  @IsNotEmpty()
  targetCurrencyId!: string;

  @IsString()
  @IsNotEmpty()
  sourceAmount!: string;

  @IsString()
  @IsNotEmpty()
  targetAmount!: string;

  @IsString()
  @IsNotEmpty()
  rate!: string;

  @IsString()
  @IsNotEmpty()
  idempotencyKey!: string;
}
