import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ModuleSystemService } from './module-system.service';
import { CreateModuleSystemDto } from './dto/create-module-system.dto';
import { UpdateModuleSystemDto } from './dto/update-module-system.dto';

@Controller('module-system')
export class ModuleSystemController {
  constructor(private readonly moduleSystemService: ModuleSystemService) {}

  @Post()
  create(@Body() createModuleSystemDto: CreateModuleSystemDto) {
    return this.moduleSystemService.create(createModuleSystemDto);
  }

  @Get()
  findAll() {
    return this.moduleSystemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moduleSystemService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateModuleSystemDto: UpdateModuleSystemDto,
  ) {
    return this.moduleSystemService.update(+id, updateModuleSystemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moduleSystemService.remove(+id);
  }
}
