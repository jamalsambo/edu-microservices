/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsUUID, IsNotEmpty } from 'class-validator';

export class AddEmployeeTeachingsDto {
  @IsNotEmpty()
  @IsUUID()
  employeeId: string;

  @IsNotEmpty()
  @IsUUID()
  disciplineId: string;

  @IsNotEmpty()
  @IsUUID()
  classeId?: string;
}
