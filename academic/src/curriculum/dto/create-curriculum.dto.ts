// create-curriculum.dto.ts
import { IsString, IsBoolean, IsInt, IsUUID, IsOptional, Min } from 'class-validator';

export class CreateCurriculumDto {
  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean = true;

  @IsInt()
  @Min(1)
  year: number;

  @IsUUID()
  regime_id: string;

  @IsUUID()
  institution_id: string;
}
