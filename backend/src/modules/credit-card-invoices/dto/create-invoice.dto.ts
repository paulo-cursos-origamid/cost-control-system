import { IsDateString, IsString, IsUUID } from 'class-validator';

export class CreateInvoiceDto {
  @IsString()
  referenceMonth!: string;

  @IsDateString()
  dueDate!: string;

  @IsUUID()
  creditCardId!: string;
}
