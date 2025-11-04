/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IsString,
  IsOptional,
  IsUUID
} from 'class-validator';

export class CreateEmployeeDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsUUID()
  institutionId?: string;

  @IsOptional()
  @IsUUID()
  basicInformationId?: string;

  @IsOptional()
  @IsString()
  teacher?: string;
}
