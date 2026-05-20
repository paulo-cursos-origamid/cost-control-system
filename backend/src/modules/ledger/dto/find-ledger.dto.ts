import { IsEnum, IsOptional, IsString } from 'class-validator';

import { LedgerEntryType } from '@prisma/client';

export class FindLedgerDto {
  @IsOptional()
  @IsString()
  accountId?: string;

  @IsOptional()
  @IsEnum(LedgerEntryType)
  type?: LedgerEntryType;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;

  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}
