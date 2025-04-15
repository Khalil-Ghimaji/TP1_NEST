import { IsOptional, IsString, IsNumber } from 'class-validator';
export class GetCvsQueryParamsDto {
  @IsOptional()
  @IsString()
  chaine?: string;

  @IsOptional()
  @IsNumber()
  age?: number;
}