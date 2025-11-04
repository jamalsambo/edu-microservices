/* eslint-disable prettier/prettier */
import {
  IsInt,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';

export class AddEvolutionTypeToDiscipline {
  @IsNotEmpty()
  @IsUUID()
  disciplineId: string;

  @IsNotEmpty()
  @IsUUID()
  evolutionTypeId: string;

  @IsNotEmpty()
  @IsInt()
  percentage: number;
}
