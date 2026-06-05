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

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { RecurrenceFrequency, TransactionType } from '@prisma/client';

export class CreateRecurringTransactionDto {
  @ApiProperty({
    example: 'Netflix Subscription',
    description: 'Recurring transaction title',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({
    example: 'Monthly streaming subscription',
    description: 'Optional recurring transaction description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 39.9,
    description: 'Recurring transaction amount',
  })
  @IsNumber()
  amount!: number;

  @ApiProperty({
    enum: TransactionType,
    example: TransactionType.EXPENSE,
    description: 'Transaction type',
  })
  @IsEnum(TransactionType)
  type!: TransactionType;

  @ApiProperty({
    enum: RecurrenceFrequency,
    example: RecurrenceFrequency.MONTHLY,
    description: 'Recurrence frequency',
  })
  @IsEnum(RecurrenceFrequency)
  frequency!: RecurrenceFrequency;

  @ApiProperty({
    example: '2026-06-01',
    description: 'Recurrence start date',
  })
  @IsDateString()
  startDate!: string;

  @ApiPropertyOptional({
    example: '2027-06-01',
    description: 'Optional recurrence end date',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({
    example: '2026-07-01',
    description: 'Next scheduled execution date',
  })
  @IsDateString()
  nextExecution!: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Defines if recurrence is active',
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Financial account id',
  })
  @IsUUID()
  accountId!: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440111',
    description: 'Category id',
  })
  @IsUUID()
  categoryId!: string;
}
