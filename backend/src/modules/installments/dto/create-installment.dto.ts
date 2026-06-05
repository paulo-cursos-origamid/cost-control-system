import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInstallmentDto {
  @ApiProperty({
    example: 'Notebook Gamer',
    description: 'Installment purchase title',
  })
  @IsString()
  title!: string;

  @ApiPropertyOptional({
    example: 'Compra parcelada em 12x',
    description: 'Optional installment description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 12000,
    description: 'Total purchase amount',
    minimum: 0.01,
  })
  @IsNumber()
  totalAmount!: number;

  @ApiProperty({
    example: 12,
    description: 'Total number of installments',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  totalInstallments!: number;

  @ApiProperty({
    example: '2026-06-05',
    description: 'Purchase date',
  })
  @IsDateString()
  purchaseDate!: string;

  @ApiProperty({
    example: '2026-07-05',
    description: 'First installment due date',
  })
  @IsDateString()
  firstDueDate!: string;

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
