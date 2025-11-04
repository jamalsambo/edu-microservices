import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { InstitutionsEntity } from 'src/institution/entities/institution.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,

    @InjectRepository(InstitutionsEntity)
    private readonly institutionRepository: Repository<InstitutionsEntity>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const { institutionId } = createCourseDto;
    const institution = await this.institutionRepository.findOne({
      where: { id: institutionId },
      relations: ['educationLevel'],
    });

    const entity = this.getCourseEntityByInstitution(institution);

    const course = this.courseRepository.create(createCourseDto);

    await this.courseRepository.save(course);

    return { entity, data: course };
  }

  async findAll(institutionId?: string, relations: string[] = []) {
    const allowedRelations = [
      'institution',
      'coordinator',
      'coordinator.basicInformation',
      'classes',
    ];

    const safeRelations = relations.filter((r) => allowedRelations.includes(r));

    // 🧩 Mapa de relações → nome => callback que aplica o join
    const relationMap: Record<string, (qb: any) => void> = {
      institution: (qb) =>
        qb.leftJoinAndSelect('course.institution', 'institution'),

      coordinator: (qb) =>
        qb.leftJoinAndSelect('course.coordinator', 'coordinator'),

      'coordinator.basicInformation': (qb) => {
        // só garante o join prévio do coordinator se ainda não existir
        qb.leftJoin('course.coordinator', 'coordinator', undefined, {
          disableMixedMap: true,
        });
        qb.leftJoinAndSelect(
          'coordinator.basicInformation',
          'basicInformation',
        );
      },

      classes: (qb) => qb.leftJoinAndSelect('course.classes', 'classes'),
    };

    // Cria o QueryBuilder base
    const query = this.courseRepository.createQueryBuilder('course');

    // ✅ Aplica dinamicamente as relações pedidas
    safeRelations.forEach((rel) => {
      const applyJoin = relationMap[rel];
      if (applyJoin) applyJoin(query);
    });

    // ✅ Filtro por instituição (se existir)
    if (institutionId) {
      query.where('course.institutionId = :institutionId', { institutionId });
    }

    const courses = await query.getMany();

    const institution = institutionId
      ? await this.institutionRepository.findOne({
          where: { id: institutionId },
          relations: ['educationLevel'],
        })
      : null;

    const entity = this.getCourseEntityByInstitution(institution);

    return { entity, data: courses };
  }

  async findOneOrFail(
    conditions: FindOptionsWhere<CourseEntity>,
    relations: string[] = [],
    options?: FindOneOptions<CourseEntity>,
  ) {
    try {
      // Relações permitidas (para segurança)
      const allowedRelations = [
        'institution',
        'institution.educationLevel',
        'coordinator',
        'coordinator.basicInformation',
        'classes',
      ];

      // Filtra apenas as relações seguras
      const safeRelations = relations.filter((r) =>
        allowedRelations.includes(r),
      );

      // Faz a busca
      const course = await this.courseRepository.findOneOrFail({
        where: conditions,
        relations: safeRelations,
        ...options,
      });

      // Continua tua lógica normal
      const entity = this.getCourseEntityByInstitution(course.institution);

      return { entity, data: course };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('Curso não encontrado');
    }
  }

  async update(id: string, data: UpdateCourseDto): Promise<CourseEntity> {
    const course = await this.courseRepository.findOne({
      where: { id: id },
    });
    this.courseRepository.merge(course, data);
    return await this.courseRepository.save(course);
  }

  private getCourseEntityByInstitution(institution: any) {
    // padrão
    let entity = { list: 'Classes', create: 'Classe' };

    if (
      institution?.educationLevel?.name
        ?.toLowerCase()
        .includes('jardim de infancia')
    ) {
      entity = { list: 'Níveis', create: 'Nível' };
    } else if (
      institution?.educationLevel?.name?.toLowerCase().includes('ensino geral')
    ) {
      entity = { list: 'Classes', create: 'Classe' };
    }

    return entity;
  }
}
