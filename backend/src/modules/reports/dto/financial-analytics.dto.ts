import { IsDateString, IsOptional, IsUUID } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class FinancialAnalyticsDto {
  @ApiPropertyOptional({
    example: '2026-01-01',
    description: 'Initial analytics date',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    example: '2026-12-31',
    description: 'Final analytics date',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Filter analytics by account id',
  })
  @IsOptional()
  @IsUUID()
  accountId?: string;
}
