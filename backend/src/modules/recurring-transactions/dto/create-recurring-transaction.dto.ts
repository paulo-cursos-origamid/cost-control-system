import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import {
  RecurrenceFrequency,
  TransactionType,
} from '@prisma/client';

export class CreateRecurringTransactionDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  amount!: number;

  @IsEnum(TransactionType)
  type!: TransactionType;

  @IsEnum(RecurrenceFrequency)
  frequency!: RecurrenceFrequency;

  @IsDateString()
  startDate!: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsDateString()
  nextExecution!: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsUUID()
  accountId!: string;

  @IsUUID()
  categoryId!: string;
}