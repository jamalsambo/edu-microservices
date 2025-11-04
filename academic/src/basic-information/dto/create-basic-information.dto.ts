/* eslint-disable prettier/prettier */
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsDateString,
} from 'class-validator';
import { BasicInformationGenderEnum } from '../enum/basic-information-gender.enum';
import { BasicInformationMaritalStatusEnum } from '../enum/basic-information-marita-status.enum';

export class CreateBasicInformationDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsDateString()
  dateBirth: string;

  @IsNotEmpty()
  @IsEnum(BasicInformationGenderEnum)
  gender: BasicInformationGenderEnum;

  @IsNotEmpty()
  @IsEnum(BasicInformationMaritalStatusEnum)
  maritalStatus: BasicInformationMaritalStatusEnum;

  @IsNotEmpty()
  @IsUUID()
  countryId: string;

  @IsNotEmpty()
  @IsUUID()
  naturalCountry: string;

  @IsNotEmpty()
  @IsUUID()
  naturalProvince: string;

  @IsNotEmpty()
  @IsUUID()
  districtId: string;

  @IsOptional()
  @IsString()
  neighborhood?: string;

  @IsOptional()
  @IsString()
  houseNumber?: string;

  @IsOptional()
  @IsUUID()
  employeeId: string;

  @IsOptional()
  @IsUUID()
  studentId: string;
}
