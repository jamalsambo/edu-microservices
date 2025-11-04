/* eslint-disable prettier/prettier */
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class AddCurriculumHasDiscipline {
  @IsNotEmpty()
  @IsUUID()
  curriculumId: string;

  @IsNotEmpty()
  @IsUUID()
  disciplineId: string;

  @IsNotEmpty()
  @IsUUID()
  periodId: string;

  @IsNotEmpty()
  @IsInt()
  workload: number;

  @IsNotEmpty()
  @IsBoolean()
  exame: boolean = false;

  @IsOptional()
  @IsBoolean()
  participation: boolean = false;

  @IsOptional()
  @IsBoolean()
  critical: boolean = false;

  @IsOptional()
  @IsInt()
  year?: number;
}
