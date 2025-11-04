import {
  IsUUID,
  IsOptional,
  IsDateString,
  IsNumber,
  IsString,
  IsInt,
  IsDate,
  IsNotEmpty,
} from 'class-validator';

export class CreateEvolutionDto {
  @IsUUID()
  studentId: string;

  @IsUUID()
  disciplineId: string;

  @IsUUID()
  classId: string;
  
  @IsNotEmpty()
  @IsUUID()
  evolutionTypeId: string

  @IsOptional()
  @IsNumber()
  note?: number;

  @IsDate()
  dateCompletion: Date;

  @IsOptional()
  @IsString()
  observations?: string;
}
