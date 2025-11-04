import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentService.create(createEnrollmentDto);
  }

  @Get(':institutionId')
  findAll(
    @Param('institutionId') institutionId: string,
    @Query('relations') relations?: string,
  ) {
    const relationArray = relations ? relations.split(',') : [];
    return this.enrollmentService.findAll(institutionId, relationArray);
  }

  @Get(':field/:value')
  async findByField(
    @Param('field') field: string,
    @Param('value') value: string,
    @Query('relations') relations?: string,
  ) {
    const relationArray = relations ? relations.split(',') : [];

    return this.enrollmentService.findOneOrFail(
      { [field]: value },
      relationArray,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
  ) {
    return this.enrollmentService.update(id, updateEnrollmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enrollmentService.remove(id);
  }

  @Post('count')
  countEnrollments(@Query() query: any) {
    console.log(query);
    return this.enrollmentService.countEnrollments(query);
  }
}
