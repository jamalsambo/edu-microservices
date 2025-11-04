import { Injectable } from '@nestjs/common';
import { CreateEvolutionDto } from './dto/create-evolution.dto';
import { UpdateEvolutionDto } from './dto/update-evolution.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EvolutionEntity } from './entities/evolution.entity';
import { EvolutionTypeEntity } from './entities/evolution-type.entity';
import { Repository } from 'typeorm';
import { CreateEvolutionTypeDto } from './dto/create-evolution-type.dto';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class EvolutionService {
  constructor(
    @InjectRepository(EvolutionEntity)
    private readonly evolutionType: Repository<EvolutionEntity>,

    @InjectRepository(EvolutionTypeEntity)
    private readonly evolutioTypeRepo: Repository<EvolutionTypeEntity>,

    private studentService: StudentService,
  ) {}

  async create(createEvolutionDto: CreateEvolutionDto) {
    return await this.evolutionType.save(createEvolutionDto);
  }

  async findAll(institutionId: string, options: any) {
    const { studentRelations = [], classId } = options;

    const safeStudentRelations = Array.isArray(studentRelations)
      ? studentRelations
      : [];

    const students = await this.studentService.findAll(institutionId, {
      relations: safeStudentRelations,
      classId, // caso queira filtrar depois por classId
    });

    return students;
  }

  findOne(id: number) {
    return `This action returns a #${id} evolution`;
  }

  async update(id: string, updateEvolutionDto: UpdateEvolutionDto) {
    const evolution = await this.evolutionType.findOne({
      where: { id: id },
    });
    if (!evolution) {
      throw new Error('Evolução não encontrado');
    }
    this.evolutionType.merge(evolution, updateEvolutionDto);
    return await this.evolutionType.save(evolution);
  }

  remove(id: number) {
    return `This action removes a #${id} evolution`;
  }

  async createType(payload: CreateEvolutionTypeDto) {
    await this.evolutioTypeRepo.save(payload);
  }

  async findType(institutionId: string) {
    return this.evolutioTypeRepo.find({
      where: { institutionId: institutionId },
    });
  }
}
