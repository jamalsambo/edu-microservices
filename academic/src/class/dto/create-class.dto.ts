import {
  IsUUID,
  IsString,
  IsEnum,
  IsOptional,
  IsInt,
  IsDateString,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreateClassDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsUUID()
  courseId: string;

  @IsOptional()
  @IsUUID()
  curriculumId?: string;

  @IsNotEmpty()
  @IsString()
  typeTeaching: string;

  @IsNotEmpty()
  @IsInt()
  vacancyLimit: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @IsNotEmpty()
  @IsUUID()
  shiftId: string;

  @IsOptional()
  @IsEnum(['A', 'B', 'C'])
  area?: 'A' | 'B' | 'C';

  @IsNotEmpty()
  @IsUUID()
  roomId: string;

  @IsOptional()
  @IsUUID()
  leader?: string;

  @IsOptional()
  @IsNumber()
  monthlyFee?: number;

  @IsNotEmpty()
  @IsString()
  institutionType: string;
}
