import { IsDateString, IsOptional, IsUUID } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class VehicleReportDto {
  @ApiPropertyOptional({
    example: '550e8400-e29b-41d4-a716-446655440222',
    description: 'Vehicle id',
  })
  @IsOptional()
  @IsUUID()
  vehicleId?: string;

  @ApiPropertyOptional({
    example: '2026-01-01',
    description: 'Initial report date',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    example: '2026-12-31',
    description: 'Final report date',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
