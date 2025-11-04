import { PartialType } from '@nestjs/mapped-types';
import { CreatePeriodRangeDto } from './create-period-range.dto'; 

export class UpdatePeriodRangeDto extends PartialType(CreatePeriodRangeDto) {}
