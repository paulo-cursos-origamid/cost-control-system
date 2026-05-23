import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateInstallmentDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  totalAmount!: number;

  @IsInt()
  @Min(1)
  totalInstallments!: number;

  @IsDateString()
  purchaseDate!: string;

  @IsDateString()
  firstDueDate!: string;

  @IsUUID()
  accountId!: string;

  @IsUUID()
  categoryId!: string;
}
