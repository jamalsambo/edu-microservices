import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get(':institutionId')
  async findAll(
    @Param('institutionId') institutionId?: string,
    @Query('relations') relations?: string,
  ) {
    const relationArray = relations ? relations.split(',') : [];

    return this.courseService.findAll(
      institutionId ? String(institutionId) : undefined,
      relationArray,
    );
  }

  @Get(':field/:value')
  async findByField(
    @Param('field') field: string,
    @Param('value') value: string,
  ) {
    return this.courseService.findOneOrFail({ [field]: value });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }
}
