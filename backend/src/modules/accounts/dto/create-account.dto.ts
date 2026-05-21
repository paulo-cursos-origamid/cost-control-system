import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  IsEnum,
} from 'class-validator';

import { AccountType } from '@prisma/client';
export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEnum(AccountType)
  type!: AccountType;

  @IsOptional()
  @IsNumber()
  @Min(0)
  initialBalance?: number;
}
