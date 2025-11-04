import { PartialType } from '@nestjs/mapped-types';
import { CreateBasicInformationDto } from './create-basic-information.dto';

export class UpdateBasicInformationDto extends PartialType(CreateBasicInformationDto) {}
