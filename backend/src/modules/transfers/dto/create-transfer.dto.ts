import {
  IsUUID,
  IsNumber,
  IsPositive,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTransferDto {
  /*
    Conta origem da transferência
  */
  @IsUUID()
  fromAccountId!: string;

  /*
    Conta destino da transferência
  */
  @IsUUID()
  toAccountId!: string;

  /*
    Valor da transferência
  */
  @IsNumber()
  @IsPositive()
  amount!: number;

  /*
    Descrição opcional
  */
  @IsOptional()
  @IsString()
  description?: string;
}
