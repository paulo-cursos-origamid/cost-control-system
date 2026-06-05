import {
  IsUUID,
  IsNumber,
  IsPositive,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTransferDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Source account id',
  })
  @IsUUID()
  fromAccountId!: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440111',
    description: 'Destination account id',
  })
  @IsUUID()
  toAccountId!: string;

  @ApiProperty({
    example: 500,
    description: 'Transfer amount',
    minimum: 0.01,
  })
  @IsNumber()
  @IsPositive()
  amount!: number;

  @ApiPropertyOptional({
    example: 'Transferência para reserva de emergência',
    description: 'Optional transfer description',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
