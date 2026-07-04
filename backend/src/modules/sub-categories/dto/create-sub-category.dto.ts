import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateSubCategoryDto {
  @IsString()
  name!: string;

  @IsString()
  slug!: string;

  @IsUUID()
  categoryId!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
