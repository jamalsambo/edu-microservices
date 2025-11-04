import { Injectable } from '@nestjs/common';
import { CreateModuleSystemDto } from './dto/create-module-system.dto';
import { UpdateModuleSystemDto } from './dto/update-module-system.dto';
import { ModuleSystemEntity } from './entities/module-system.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ModuleSystemService {
  constructor(
    @InjectRepository(ModuleSystemEntity)
    private readonly moduleSystemRepo: Repository<ModuleSystemEntity>,
  ) {}
  create(createModuleSystemDto: CreateModuleSystemDto) {
    return 'This action adds a new moduleSystem';
  }

  async findAll() {
    return await this.moduleSystemRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} moduleSystem`;
  }

  update(id: number, updateModuleSystemDto: UpdateModuleSystemDto) {
    return `This action updates a #${id} moduleSystem`;
  }

  remove(id: number) {
    return `This action removes a #${id} moduleSystem`;
  }
}
