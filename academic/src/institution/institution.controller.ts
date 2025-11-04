import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InstitutionService } from './institution.service';
import {
  CreateDisciplineDto,
  CreateInstitutionDto,
  CreateRoomDto,
  CreateShiftDto,
} from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';

@Controller('institution')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @Post('create')
  create(@Body() createInstitutionDto: CreateInstitutionDto) {
    return this.institutionService.create(createInstitutionDto);
  }

  @Get('find')
  findAll() {
    return this.institutionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.institutionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInstitutionDto: UpdateInstitutionDto,
  ) {
    return this.institutionService.update(id, updateInstitutionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.institutionService.remove(id);
  }

  @Post('shift')
  createShift(@Body() payload: CreateShiftDto) {
    return this.institutionService.createShift(payload);
  }

  @Post('room')
  createRoom(@Body() payload: CreateRoomDto) {
    return this.institutionService.createRoom(payload);
  }

  @Post('discipline')
  createDiscipline(@Body() payload: CreateDisciplineDto) {
    return this.institutionService.createDiscipline(payload);
  }

  @Get(':institutionId/shifts')
  findShifts(@Param('institutionId') institutionId: string) {
    return this.institutionService.findShift(institutionId);
  }

  @Get(':institutionId/rooms')
  findRooms(@Param('institutionId') institutionId: string) {
    return this.institutionService.findRooms(institutionId);
  }

  
  @Get(':institutionId/disciplines')
  findDisciplines(@Param('institutionId') institutionId: string) {
    return this.institutionService.findDisciplines(institutionId);
  }

  @Post(':institutionId/regime/:regimeId')
  addRegime(
    @Param('institutionId') institutionId: string,
    @Param('regimeId') regimeId: string,
  ) {
    return this.institutionService.addRegime(institutionId, regimeId);
  }

  @Get(':institutionId/regimes')
  async findRegimes(@Param('institutionId') institutionId: string) {
    return this.institutionService.findRegimes(institutionId);
  }
}
