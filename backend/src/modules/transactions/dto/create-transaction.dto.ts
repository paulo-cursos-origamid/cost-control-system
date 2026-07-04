import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

import { TransactionType } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTransactionDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(0.01)
  amount!: number;

  @IsEnum(TransactionType)
  type!: TransactionType;

  @IsDateString()
  date!: string;

  @IsUUID()
  accountId!: string;

  @IsOptional()
  @IsUUID()
  creditCardId?: string;

  @IsUUID()
  categoryId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  subCategoryId?: string;
}
