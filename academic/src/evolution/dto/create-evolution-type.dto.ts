/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEvolutionTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

 @IsNotEmpty()
  @IsString()
  type: string;
}
