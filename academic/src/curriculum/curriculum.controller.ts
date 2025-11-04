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
import { CurriculumService } from './curriculum.service';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';
import { AddCurriculumHasDiscipline } from './dto/add-curriculum-has-discipline.dt';
import { AddEvolutionTypeToDiscipline } from './dto/add-evolution-type-to-discipline.dto';

@Controller('curriculum')
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @Post()
  create(@Body() createCurriculumDto: CreateCurriculumDto) {
    return this.curriculumService.create(createCurriculumDto);
  }

  @Get(':institutionId')
  findAll(@Param('institutionId') institutionId: string) {
    return this.curriculumService.findAll(institutionId);
  }

  @Get(':field/:value')
  async findByField(
    @Param('field') field: string,
    @Param('value') value: string,
    @Query('relations') relations?: string,
  ) {
    const relationArray = relations ? relations.split(',') : [];

    return this.curriculumService.findOneOrFail(
      { [field]: value },
      relationArray,
    );
  }

  @Patch('edit-discipline/:id')
  editDiscipline(
    @Param('id') id: string,
    @Body() payload: Partial<AddEvolutionTypeToDiscipline>,
  ) {
    return this.curriculumService.editDiscipline(id, payload);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCurriculumDto: UpdateCurriculumDto,
  ) {
    return this.curriculumService.update(id, updateCurriculumDto);
  }

  @Post('add-discipline')
  addDiscipline(@Body() payload: AddCurriculumHasDiscipline) {
    return this.curriculumService.addDiscipline(payload);
  }

  @Post('add-evolution-type-to-discipline')
  addEvolutionTypeToDiscipline(@Body() payload: AddEvolutionTypeToDiscipline) {
    return this.curriculumService.addEvolutionTypeToDiscipline(payload);
  }
}
