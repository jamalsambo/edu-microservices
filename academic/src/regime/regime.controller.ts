import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RegimeService } from './regime.service';
import { CreatePeriodRangeDto } from './dto/create-period-range.dto';

@Controller('regime')
export class RegimeController {
  constructor(private readonly regimeService: RegimeService) {}

  @Get()
  findAll() {
    return this.regimeService.findAll();
  }

  @Get(':field/:value')
  async findByField(
    @Param('field') field: string,
    @Param('value') value: string,
  ) {
    return this.regimeService.findOneOrFail({ [field]: value });
  }

  @Post('period-range/:periodId/institution/:institutionId')
  createPeriodRange(
    @Param('periodId') periodId: string,
    @Param('institutionId') institutionId: string,
    @Body() payload: CreatePeriodRangeDto,
  ) {
    return this.regimeService.createPeriodRange(
      institutionId,
      periodId,
      payload,
    );
  }
}
