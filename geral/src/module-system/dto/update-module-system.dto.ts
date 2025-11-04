import { PartialType } from '@nestjs/mapped-types';
import { CreateModuleSystemDto } from './create-module-system.dto';

export class UpdateModuleSystemDto extends PartialType(CreateModuleSystemDto) {}
