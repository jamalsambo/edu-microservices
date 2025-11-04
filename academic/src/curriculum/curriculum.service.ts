import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CurriculumEntity } from './entities/curriculum.entity';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { CurriculumHasDisciplineEntity } from './entities/has-discipline.entity';
import { AddCurriculumHasDiscipline } from './dto/add-curriculum-has-discipline.dt';
import { DisciplineHasEvolutionTypeEntity } from './entities/discipline-evolution-type.entity';
import { AddEvolutionTypeToDiscipline } from './dto/add-evolution-type-to-discipline.dto';

@Injectable()
export class CurriculumService {
  constructor(
    @InjectRepository(CurriculumEntity)
    private readonly curriculumRepo: Repository<CurriculumEntity>,

    @InjectRepository(CurriculumHasDisciplineEntity)
    private readonly curriculumHasDisciplineRepo: Repository<CurriculumHasDisciplineEntity>,

    @InjectRepository(DisciplineHasEvolutionTypeEntity)
    private readonly disciplineEvolutionTypeRepo: Repository<DisciplineHasEvolutionTypeEntity>,
  ) {}
  async create(createCurriculumDto: CreateCurriculumDto) {
    return await this.curriculumRepo.save(createCurriculumDto);
  }

  async findAll(institutionId: string) {
    return await this.curriculumRepo.find({ where: { institutionId } });
  }

  async findOneOrFail(
    conditions: FindOptionsWhere<CurriculumEntity>,
    relations: string[] = [],
    options?: FindOneOptions<CurriculumEntity>,
  ) {
    try {
      const allowedRelations = [
        'classes',
        'curriculumDiscipline',
        'curriculumDiscipline.discipline',
        'curriculumDiscipline.period',
        'curriculumDiscipline.evolutionTypes',
        'curriculumDiscipline.teaching',
        'curriculumDiscipline.teaching.employee.basicInformation',
      ];

      // Filtra apenas as relações seguras
      const safeRelations = relations.filter((r) =>
        allowedRelations.includes(r),
      );

      return await this.curriculumRepo.findOneOrFail({
        where: conditions,
        ...options,
        relations: safeRelations,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Curriculum não encontrado');
    }
  }

  async update(
    id: string,
    data: UpdateCurriculumDto,
  ): Promise<CurriculumEntity> {
    const curriculum = await this.curriculumRepo.findOne({
      where: { id: id },
    });
    this.curriculumRepo.merge(curriculum, data);
    return await this.curriculumRepo.save(curriculum);
  }

  async addDiscipline(payload: AddCurriculumHasDiscipline) {
    return await this.curriculumHasDisciplineRepo.save(payload);
  }

  async editDiscipline(
    id: string,
    payload: Partial<AddCurriculumHasDiscipline>,
  ) {

    const discipline = await this.curriculumHasDisciplineRepo.findOne({
      where: { id: id },
    });
    this.curriculumHasDisciplineRepo.merge(discipline, payload);
    return await this.curriculumHasDisciplineRepo.save(discipline);
  }

  async addEvolutionTypeToDiscipline(payload: AddEvolutionTypeToDiscipline) {
    return await this.disciplineEvolutionTypeRepo.save(payload);
  }
}
