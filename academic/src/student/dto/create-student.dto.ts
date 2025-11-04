/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { StudentStatusEnum } from '../enum/student-status.enum';

export class CreateStudentDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsNotEmpty()
  @IsUUID()
  institutionId: string;

  @IsOptional()
  @IsUUID()
  basicInformationId: string;

  @IsOptional()
  @IsEnum(StudentStatusEnum)
  @Transform(({ value }) => value ?? StudentStatusEnum.Activo) // valor padrão
  status: StudentStatusEnum;
}
