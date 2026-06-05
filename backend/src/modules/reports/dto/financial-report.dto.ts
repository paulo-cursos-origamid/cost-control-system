import { IsDateString, IsOptional, IsUUID } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class FinancialReportDto {
  @ApiPropertyOptional({
    example: '2026-01-01',
    description: 'Initial date for financial report',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    example: '2026-12-31',
    description: 'Final date for financial report',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Filter by account id',
  })
  @IsOptional()
  @IsUUID()
  accountId?: string;

  @ApiPropertyOptional({
    example: '550e8400-e29b-41d4-a716-446655440111',
    description: 'Filter by category id',
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;
}
