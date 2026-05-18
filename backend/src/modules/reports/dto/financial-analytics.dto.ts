import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export class FinancialAnalyticsDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsUUID()
  accountId?: string;
}
