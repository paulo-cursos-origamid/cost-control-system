import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { MaintenanceType } from '@prisma/client';

export class CreateMaintenanceDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440111',
    description: 'Vehicle ID',
  })
  @IsUUID()
  vehicleId!: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440222',
    description: 'Account ID',
  })
  @IsUUID()
  accountId!: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440333',
    description: 'Category ID',
  })
  @IsUUID()
  categoryId!: string;

  @ApiProperty({
    enum: MaintenanceType,
    example: MaintenanceType.MECHANICAL,
    description: 'Maintenance type',
  })
  @IsEnum(MaintenanceType)
  type!: MaintenanceType;

  @ApiProperty({
    example: 'Troca de óleo e filtro',
    description: 'Maintenance description',
  })
  @IsString()
  description!: string;

  @ApiProperty({
    example: 350.5,
    description: 'Maintenance cost',
  })
  @IsNumber()
  @IsPositive()
  cost!: number;

  @ApiPropertyOptional({
    example: 45230,
    description: 'Vehicle odometer at maintenance time',
  })
  @IsOptional()
  @IsNumber()
  odometer?: number;

  @ApiPropertyOptional({
    example: 'Oficina Central',
    description: 'Workshop name',
  })
  @IsOptional()
  @IsString()
  workshop?: string;

  @ApiPropertyOptional({
    example: '2026-06-05',
    description: 'Date when maintenance was performed',
  })
  @IsOptional()
  @IsDateString()
  performedAt?: string;

  @ApiPropertyOptional({
    example: '2026-12-05',
    description: 'Next maintenance date',
  })
  @IsOptional()
  @IsDateString()
  nextMaintenanceAt?: string;

  @ApiPropertyOptional({
    example: 50230,
    description: 'Next maintenance odometer target',
  })
  @IsOptional()
  @IsNumber()
  nextMaintenanceKm?: number;
}
