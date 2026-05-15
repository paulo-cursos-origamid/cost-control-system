import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

import { MaintenanceType } from '@prisma/client';

export class CreateMaintenanceDto {
  @IsUUID()
  vehicleId!: string;

  @IsUUID()
  accountId!: string;

  @IsUUID()
  categoryId!: string;

  @IsEnum(MaintenanceType)
  type!: MaintenanceType;

  @IsString()
  description!: string;

  @IsNumber()
  @IsPositive()
  cost!: number;

  @IsOptional()
  @IsNumber()
  odometer?: number;

  @IsOptional()
  @IsString()
  workshop?: string;

  @IsOptional()
  @IsDateString()
  performedAt?: string;

  @IsOptional()
  @IsDateString()
  nextMaintenanceAt?: string;

  @IsOptional()
  @IsNumber()
  nextMaintenanceKm?: number;
}
