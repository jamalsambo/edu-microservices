import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassEntity } from './entities/class.entity';
import {
  FindOneOptions,
  FindOptionsWhere,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { GenerateClassCodeService } from 'src/services/generate-class-code.service';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(ClassEntity)
    private readonly classRepo: Repository<ClassEntity>,

    private readonly generateClassCode: GenerateClassCodeService,
  ) {}
  async create(createClassDto: CreateClassDto) {
    const { area, courseId, startDate, institutionType } = createClassDto;

    const classes = await this.findAll(courseId, startDate, area);
    const name = await this.generateClassCode.generateClassCode(
      institutionType,
      classes.length + 1,
      area,
    );

    const newClass = this.classRepo.create({
      ...createClassDto,
      name, // adiciona o código gerado
    });

    return await this.classRepo.save(newClass);
  }

  async findAll(
    courseId?: string,
    today?: string,
    area?: string,
    relations?: any,
  ): Promise<ClassEntity[]> {
    const whereClause: any = {};

    if (courseId) whereClause.courseId = courseId;
    if (today) whereClause.startDate = LessThanOrEqual(today);
    if (today) whereClause.endDate = MoreThanOrEqual(today);
    if (area) whereClause.area = area;

    const allowedRelations = ['enrollments'];

    // Filtra apenas as relações seguras
    const safeRelations = relations.filter((r) => allowedRelations.includes(r));

    return await this.classRepo.find({
      where: { ...whereClause },
      relations: safeRelations,
    });
  }
  async findOneOrFail(
    conditions: FindOptionsWhere<ClassEntity>,
    relations: string[] = [],
    options?: FindOneOptions<ClassEntity>,
  ) {
    try {
      const allowedRelations = [
        'enrollments',
        'enrollments.student',
        'enrollments.student.basicInformation',
      ];

      // Filtra apenas as relações seguras
      const safeRelations = relations.filter((r) =>
        allowedRelations.includes(r),
      );

      return await this.classRepo.findOneOrFail({
        where: conditions,
        ...options,
        relations: safeRelations,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('Turma nao encontrado'); // Mensagem de erro mais clara
    }
  }

  async update(id: string, data: UpdateClassDto): Promise<ClassEntity> {
    const classEntity = await this.classRepo.findOne({
      where: { id: id },
    });
    if (!classEntity) {
      throw new Error('Class not found');
    }
    this.classRepo.merge(classEntity, data);
    return await this.classRepo.save(classEntity);
  }
}
