/* eslint-disable prettier/prettier */
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CoursetatusEnum } from '../enum/course-status.enum';

export class CreateCourseDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  institutionId: string;

  @IsOptional()
  @IsEnum(CoursetatusEnum)
  status: CoursetatusEnum;

  @IsUUID()
  @IsOptional()
  coordinatorId: string;

  @IsOptional()
  @IsNumber()
  minimumAge?: number;

  @IsOptional()
  @IsNumber()
  maximumAge?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image?: string;
}

export class CourseEvolutionTypeDto {
  @IsNotEmpty()
  @IsUUID()
  courseId: string;

  @IsNotEmpty()
  @IsUUID()
  evolutionTypeId: string;

  @IsNotEmpty()
  @IsInt()
  weight: number;
}

export class CourseEvolutionTypeItemDto {
  @IsNotEmpty()
  @IsUUID()
  courseEvolutionTypeId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  weight: number;
}
