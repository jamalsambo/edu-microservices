/* eslint-disable prettier/prettier */
import { IsUUID, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { EnrollStatusEnum } from '../enum/enroll-status.enum';
import { AdmissionTypeStatusEnum } from '../enum/admission-type-status.enum';

export class CreateEnrollmentDto {
  @IsOptional()
  @IsUUID()
  studentId?: string;

  @IsNotEmpty()
  @IsUUID()
  classId: string;

  @IsNotEmpty()
  @IsUUID()
  institutionId: string;

  @IsOptional()
  @IsUUID()
  invoiceId?: string;

  @IsOptional()
  @IsEnum(EnrollStatusEnum)
  status: EnrollStatusEnum;

   @IsOptional()
  @IsEnum(AdmissionTypeStatusEnum)
  admissionType: AdmissionTypeStatusEnum;
}
