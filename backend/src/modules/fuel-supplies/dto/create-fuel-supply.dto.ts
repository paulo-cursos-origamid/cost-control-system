import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { Type } from 'class-transformer';

import { FuelType } from '@prisma/client';

export class CreateFuelSupplyDto {
  @IsString()
  vehicleId!: string;

  @IsEnum(FuelType)
  fuelType!: FuelType;

  /*
    OPCIONAL
    SE NÃO INFORMAR:
    será calculado pelo totalAmount
  */
  @IsOptional()
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
    SE NÃO INFORMAR:
    será calculado pelos litros
  */
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0.01)
  totalAmount?: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  odometer!: number;

  @IsOptional()
  @IsBoolean()
  fullTank?: boolean;

  @IsOptional()
  @IsString()
  notes?: string;
}
