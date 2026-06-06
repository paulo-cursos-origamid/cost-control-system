import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

import { Type } from 'class-transformer';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { FuelType } from '@prisma/client';

export class CreateFuelSupplyDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440111',
    description: 'Vehicle ID',
  })
  @IsUUID()
  @IsNotEmpty()
  vehicleId!: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440222',
    description: 'Account ID',
  })
  @IsUUID()
  @IsNotEmpty()
  accountId!: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440333',
    description: 'Category ID',
  })
  @IsUUID()
  @IsNotEmpty()
  categoryId!: string;

  @ApiProperty({
    enum: FuelType,
    example: FuelType.GASOLINE,
    description: 'Fuel type',
  })
  @IsEnum(FuelType)
  fuelType!: FuelType;

  @ApiPropertyOptional({
    example: 40,
    description: 'Fuel volume in liters (optional)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0.1)
  liters?: number;

  @ApiProperty({
    example: 5.89,
    description: 'Price per liter',
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0.01)
  pricePerLiter!: number;

  @ApiPropertyOptional({
    example: 235.6,
    description: 'Total amount (optional - can be calculated automatically)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0.01)
  totalAmount?: number;

  @ApiProperty({
    example: 45230,
    description: 'Odometer reading',
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  odometer!: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Full tank indicator',
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  fullTank?: boolean;

  @ApiPropertyOptional({
    example: 'Abastecimento no posto da avenida',
    description: 'Optional notes',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
