import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @Get(':courseId')
  findAll(
    @Param('courseId') courseId: string,
    @Query('today') today?: string,
    @Query('area') area?: string,
    @Query('relations') relations?: string,
  ) {
    const relationArray = relations ? relations.split(',') : [];
    return this.classService.findAll(courseId, today, area, relationArray);
  }

  @Get(':field/:value')
  async findByField(
    @Param('field') field: string,
    @Param('value') value: string,
    @Query('relations') relations?: string,
  ) {
    const relationArray = relations ? relations.split(',') : [];
    return this.classService.findOneOrFail({ [field]: value }, relationArray);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.update(id, updateClassDto);
  }
}
