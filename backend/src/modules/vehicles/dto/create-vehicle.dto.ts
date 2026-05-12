import { ApiProperty } from '@nestjs/swagger';

import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty({
    example: 'Civic',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    example: 'Honda',
  })
  @IsString()
  brand!: string;

  @ApiProperty({
    example: 'EXL 2.0',
  })
  @IsString()
  model!: string;

  @ApiProperty({
    example: 2020,
  })
  @IsInt()
  year!: number;

  @ApiProperty({
    example: 'ABC1D23',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  plate?: string;

  @ApiProperty({
    example: 120000,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  currentKm?: number;
}