/* eslint-disable prettier/prettier */
import {
  IsBoolean,
  IsDate,
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { InstitutionStatusEnum } from 'src/enum/institution-status.enum';
import { Transform, Type } from 'class-transformer';

export class CreateInstitutionDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome não deve estar vazio' })
  name: string;

  @IsUUID()
  @IsOptional()
  parentId?: string;

  @IsUUID()
  @IsNotEmpty()
  districtId: string;

  @IsOptional()
  @IsEnum(InstitutionStatusEnum)
  status: InstitutionStatusEnum;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  nuit: string;

  @IsDecimal()
  @IsOptional()
  tax: number;

  @IsString()
  @IsNotEmpty()
  mainContact: string;

  @IsString()
  @IsOptional()
  alternativeContact?: string;

  @IsString()
  @IsOptional()
  fixed?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  logo?: string;

  @IsString()
  @IsOptional()
  domain?: string;

  @IsString()
  @IsOptional()
  aboutUs?: string;

  @IsUUID()
  @IsOptional()
  educationId?: string;

  @IsString()
  @IsOptional()
  worth?: string;

  @IsString()
  @IsOptional()
  vision?: string;

  @IsString()
  @IsOptional()
  mission?: string;
}

export class CreateShiftDto {
  @IsUUID()
  @IsNotEmpty()
  institutionId: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  start: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  end: Date;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  status: boolean;
}

export class CreateRoomDto {
 @IsNotEmpty()
  @IsUUID()
  institutionId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsBoolean()
  availability: boolean;
}

export class CreateDisciplineDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  institutionId: string;

  @IsNotEmpty()
  @IsString()
  code: string;
}
