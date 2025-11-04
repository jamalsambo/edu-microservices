import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EnrollmentEntity } from './entities/enrollment.entity';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class EnrollmentService {
  private readonly PREFIX = 'ENR.';
  constructor(
    @InjectRepository(EnrollmentEntity)
    private readonly enrollmentRepo: Repository<EnrollmentEntity>,
  ) {}

  async create(
    createEnrollmentDto: CreateEnrollmentDto,
  ): Promise<EnrollmentEntity> {
    const enrollment = this.enrollmentRepo.create(createEnrollmentDto);
    enrollment.number = await this.generateEnrollNumber(
      enrollment.institutionId,
    );

    return this.enrollmentRepo.save(enrollment);
  }

  async findAll(institutionId: string, relations: any) {
    const whereClause: any = {};

    const allowedRelations = [
      'classe',
      'classe.course',
      'student',
      'student.basicInformation',
    ];

    // Filtra apenas as relações seguras
    const safeRelations = relations.filter((r) => allowedRelations.includes(r));

    if (institutionId) whereClause.institutionId = institutionId;
    //  if (today) whereClause.startDate = LessThanOrEqual(today);
    //  if (today) whereClause.endDate = MoreThanOrEqual(today);
    //   if (area) whereClause.area = area;
    return await this.enrollmentRepo.find({
      where: { ...whereClause },
      relations: safeRelations,
    });
  }

  async findOneOrFail(
    conditions: FindOptionsWhere<EnrollmentEntity>,
    relations: string[] = [],
    options?: FindOneOptions<EnrollmentEntity>,
  ) {
    try {
      // Relações permitidas (para segurança)
      const allowedRelations = ['classe', 'classe.course'];

      // Filtra apenas as relações seguras
      const safeRelations = relations.filter((r) =>
        allowedRelations.includes(r),
      );

      // Faz a busca
      return await this.enrollmentRepo.findOneOrFail({
        where: conditions,
        relations: safeRelations,
        ...options,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('Curso não encontrado');
    }
  }

  async update(
    id: string,
    data: UpdateEnrollmentDto,
  ): Promise<EnrollmentEntity> {
    const enroll = await this.enrollmentRepo.findOne({
      where: { id: id },
    });
    if (!enroll) {
      throw new Error('Class not found');
    }
    this.enrollmentRepo.merge(enroll, data);
    return await this.enrollmentRepo.save(enroll);
  }

  async remove(id: string) {
    return await this.enrollmentRepo.delete(id);
  }

  async countEnrollments(filters?: {
    classId?: string;
    status?: string;
    year?: string;
  }) {
    const where: any = {};

    if (filters?.classId) where.classId = filters.classId;
    if (filters?.status) where.status = filters.status;
    if (filters?.year) where.year = filters.year;

    return await this.enrollmentRepo.count({ where });
  }

  async generateEnrollNumber(institutionId: string): Promise<string> {
    const year = new Date().getFullYear();
    // Buscar o maior número existente no banco
    const lastFactura = await this.enrollmentRepo.findOne({
      where: { institutionId: institutionId }, // Filtra por início da palavra FTRC-
      order: { number: 'DESC' }, // Ordena pelo número da fatura
    });

    let nextNumber = 1; // Começa com 1 se não houver registros
    if (lastFactura) {
      const lastNumber = parseInt(
        lastFactura.number.replace(this.PREFIX, ''),
        10,
      );
      nextNumber = lastNumber + 1; // Incrementa o número
    }

    // Formatar o número com 5 dígitos (exemplo: FTRC-00001)
    const formattedNumber = `${this.PREFIX}${nextNumber}.${year}`;

    return formattedNumber;
  }
}
