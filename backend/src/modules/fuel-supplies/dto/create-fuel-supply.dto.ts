import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  // ValidateIf,
} from 'class-validator';

import { Type } from 'class-transformer';

import { FuelType } from '@prisma/client';

export class CreateFuelSupplyDto {
  @IsUUID()
  @IsNotEmpty()
  vehicleId!: string;

  @IsUUID()
  @IsNotEmpty()
  accountId!: string;

  @IsUUID()
  @IsNotEmpty()
  categoryId!: string;

  @IsEnum(FuelType)
  fuelType!: FuelType;

  /*
    OPCIONAL

    CENÁRIOS:
    - litros + preço por litro
    - valor total + preço por litro

    O sistema calcula automaticamente
    o valor faltante.
  */
  @IsOptional()
  // @ValidateIf((o) => o.liters !== undefined)
  @Type(() => Number)
  @IsNumber()
  @Min(0.1)
  liters?: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0.01)
  pricePerLiter!: number;

  /*
    OPCIONAL

    Se não informar:
    será calculado automaticamente
    usando litros * preço por litro
  */
  @IsOptional()
  // @ValidateIf((o) => o.totalAmount !== undefined)
  @Type(() => Number)
  @IsNumber()
  @Min(0.01)
  totalAmount?: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  odometer!: number;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  fullTank?: boolean;

  @IsOptional()
  @IsString()
  notes?: string;
}
