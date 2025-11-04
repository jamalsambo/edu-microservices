import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get(':institutionId')
  findAll(
    @Param('institutionId') institutionId: string,
    @Query('relations') relations?: string,
  ) {
    const relationArray = relations ? relations.split(',') : [];
    return this.studentService.findAll(institutionId, {
      relations: relationArray,
    });
  }

  @Get(':field/:value')
  async findByField(
    @Param('field') field: string,
    @Param('value') value: string,
  ) {
    return this.studentService.findOneOrFail({ [field]: value });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }
}
