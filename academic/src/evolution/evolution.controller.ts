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
import { EvolutionService } from './evolution.service';
import { CreateEvolutionDto } from './dto/create-evolution.dto';
import { UpdateEvolutionDto } from './dto/update-evolution.dto';
import { CreateEvolutionTypeDto } from './dto/create-evolution-type.dto';
import { TransformEvolutionData } from 'src/services/transform-evolution-data.service';

@Controller('evolution')
export class EvolutionController {
  constructor(
    private readonly evolutionService: EvolutionService,
    private readonly transformEvolutionData: TransformEvolutionData,
  ) {}

  @Post()
  create(@Body() createEvolutionDto: CreateEvolutionDto) {
    return this.evolutionService.create(createEvolutionDto);
  }

  @Get(':institutionId')
  async findAll(
    @Param('institutionId') institutionId: string,
    @Query() query: Record<string, string>,
  ) {
    const studentRelations = query.studentRelations?.split(',') || undefined;
    const evolutionsRelations =
      query.evolutionsRelations?.split(',') || undefined;
    const classId = query.classId;

    const students = await this.evolutionService.findAll(institutionId, {
      studentRelations,
      evolutionsRelations,
      classId,
    });

    // Retorna o resultado transformado
    return this.transformEvolutionData.transformEvolutionView(students);
  }

  @Post('type')
  createType(@Body() payload: CreateEvolutionTypeDto) {
    return this.evolutionService.createType(payload);
  }

  @Get('type/:institutionId')
  findType(@Param('institutionId') institutionId: string) {
    return this.evolutionService.findType(institutionId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evolutionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEvolutionDto: UpdateEvolutionDto,
  ) {
    return this.evolutionService.update(id, updateEvolutionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evolutionService.remove(+id);
  }
}
