import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from './entities/student.entity';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { GenerateSortCodeService } from 'src/services/generate-sort-code.service';

interface FindAllOptions {
  relations?: string[];
  classId?: string;
}

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepo: Repository<StudentEntity>,

    private readonly generateSortCodeService: GenerateSortCodeService,
  ) {}

  async create(data: CreateStudentDto): Promise<StudentEntity> {
    const student = this.studentRepo.create(data);
    const sortCode = await this.generateSortCodeService.generatedSortCode();
    const year = new Date().getFullYear();

    student.number = `ST.${sortCode}.${year}`;
    await this.studentRepo.save(student);

    return student;
  }

  async findAll(institutionId: string, options: FindAllOptions = {}) {
    const { relations = [], classId } = options;

    // 🔹 Relações permitidas
    const allowedRelations = [
      'basicInformation',
      'evolutions',
      'enrollments',
      'enrollments.classe',
      'enrollments.classe.curriculum',
      'enrollments.classe.curriculum.curriculumDiscipline',
      'enrollments.classe.curriculum.curriculumDiscipline.discipline',
      'enrollments.classe.curriculum.curriculumDiscipline.period',
      'enrollments.classe.curriculum.curriculumDiscipline.evolutionTypes',
      'enrollments.classe.curriculum.curriculumDiscipline.evolutionTypes.evolutionType',
    ];

    const safeRelations = relations.filter((r) => allowedRelations.includes(r));

    const qb = this.studentRepo
      .createQueryBuilder('student')
      .where('student.institutionId = :institutionId', { institutionId });

    // 🔹 Mapa de joins
    const relationMap: Record<string, { path: string; alias: string }> = {
      enrollments: { path: 'student.enrollments', alias: 'enrollments' },
      evolutions: { path: 'student.evolutions', alias: 'evolutions' },
      'enrollments.classe': { path: 'enrollments.classe', alias: 'classe' },
      'enrollments.classe.curriculum': {
        path: 'classe.curriculum',
        alias: 'curriculum',
      },
      'enrollments.classe.curriculum.curriculumDiscipline': {
        path: 'curriculum.curriculumDiscipline',
        alias: 'curriculumDiscipline',
      },
      'enrollments.classe.curriculum.curriculumDiscipline.discipline': {
        path: 'curriculumDiscipline.discipline',
        alias: 'discipline',
      },
      'enrollments.classe.curriculum.curriculumDiscipline.period': {
        path: 'curriculumDiscipline.period',
        alias: 'period',
      },
      'enrollments.classe.curriculum.curriculumDiscipline.evolutionTypes': {
        path: 'curriculumDiscipline.evolutionTypes',
        alias: 'evolutionTypes',
      },
      'enrollments.classe.curriculum.curriculumDiscipline.evolutionTypes.evolutionType':
        {
          path: 'evolutionTypes.evolutionType',
          alias: 'evolutionType',
        },
      basicInformation: {
        path: 'student.basicInformation',
        alias: 'basicInformation',
      },
    };

    // 🔹 Monta as joins dinamicamente
    for (const relation of safeRelations) {
      const rel = relationMap[relation];
      if (rel) {
        qb.leftJoinAndSelect(rel.path, rel.alias);
      }
    }

    // 🔹 Filtro por classId (se informado)
    if (classId) {
      qb.andWhere('enrollments.classId = :classId', { classId });
    }

    const students = await qb.getMany();

    // 🔹 Se houver classId, converte enrollments[] para objeto único
    if (classId) {
      students.forEach((student) => {
        student.enrollments = student.enrollments?.[0] || null;
      });
    }

    return students;
  }
  async findOneOrFail(
    conditions: FindOptionsWhere<StudentEntity>,
    options?: FindOneOptions<StudentEntity>,
  ) {
    try {
      return await this.studentRepo.findOneOrFail({
        where: conditions,
        ...options,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('Estudante nao encontrado'); // Mensagem de erro mais clara
    }
  }

  async update(id: string, data: UpdateStudentDto): Promise<StudentEntity> {
    const student = await this.studentRepo.findOne({
      where: { id: id },
    });
    if (!student) {
      throw new Error('Estudante não encontrado');
    }
    this.studentRepo.merge(student, data);
    return await this.studentRepo.save(student);
  }
}
