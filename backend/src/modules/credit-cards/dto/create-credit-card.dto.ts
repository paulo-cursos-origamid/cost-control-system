import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateCreditCardDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  bank!: string;

  @IsString()
  @IsNotEmpty()
  brand!: string;

  @IsNumber()
  limit!: number;

  @IsInt()
  @Min(1)
  @Max(31)
  closingDay!: number;

  @IsInt()
  @Min(1)
  @Max(31)
  dueDay!: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
