import { IsEnum, IsOptional, IsString } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { LedgerEntryType } from '@prisma/client';

export class FindLedgerDto {
  @ApiPropertyOptional({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Filter by account id',
  })
  @IsOptional()
  @IsString()
  accountId?: string;

  @ApiPropertyOptional({
    enum: LedgerEntryType,
    example: LedgerEntryType.CREDIT,
    description: 'Ledger entry type',
  })
  @IsOptional()
  @IsEnum(LedgerEntryType)
  type?: LedgerEntryType;

  @ApiPropertyOptional({
    example: '2026-06-01',
    description: 'Initial filter date',
  })
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiPropertyOptional({
    example: '2026-06-30',
    description: 'Final filter date',
  })
  @IsOptional()
  @IsString()
  endDate?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Current page',
  })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({
    example: 20,
    description: 'Items per page',
  })
  @IsOptional()
  limit?: number;
}
