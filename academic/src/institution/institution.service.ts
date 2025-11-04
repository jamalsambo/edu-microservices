import { Injectable } from '@nestjs/common';
import {
  CreateDisciplineDto,
  CreateInstitutionDto,
  CreateRoomDto,
  CreateShiftDto,
} from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InstitutionsEntity } from './entities/institution.entity';
import { Like, Repository } from 'typeorm';
import { InstitutionRegimeEntity } from './entities/has-regimes.entity';
import { ShiftsEntity } from './entities/shifts.entity';
import { RoomEntity } from './entities/room.entity';
import { DisciplineEntity } from './entities/discipline.entity';

@Injectable()
export class InstitutionService {
  constructor(
    @InjectRepository(InstitutionsEntity)
    private readonly institutionRepo: Repository<InstitutionsEntity>,

    @InjectRepository(InstitutionRegimeEntity)
    private readonly institutionRegimeRepo: Repository<InstitutionRegimeEntity>,

    @InjectRepository(ShiftsEntity)
    private readonly shiftRepo: Repository<ShiftsEntity>,

    @InjectRepository(RoomEntity)
    private readonly roomRepo: Repository<RoomEntity>,

    @InjectRepository(DisciplineEntity)
    private readonly disciplineRepo: Repository<DisciplineEntity>,
  ) {}

  /* -----------------------------------------
   * 🏫 INSTITUIÇÕES
   * ----------------------------------------- */

  async create(createInstitutionDto: CreateInstitutionDto) {
    const institution = this.institutionRepo.create(createInstitutionDto);
    return await this.institutionRepo.save(institution);
  }

  async findAll() {
    return await this.institutionRepo
      .createQueryBuilder('institution')
      .leftJoin('institution.educationLevel', 'educationLevel')
      .select([
        'institution.id',
        'institution.name',
        'institution.status',
        'educationLevel.name',
      ])
      .getMany();
  }

  async findOne(id: string) {
    return await this.institutionRepo.findOne({ where: { id } });
  }

  async update(id: string, data: UpdateInstitutionDto) {
    const institution = await this.institutionRepo.findOne({ where: { id } });
    this.institutionRepo.merge(institution, data);
    return await this.institutionRepo.save(institution);
  }

  async remove(id: string) {
    await this.institutionRepo.delete(id);
    return { message: `Instituição #${id} removida com sucesso` };
  }

  /* -----------------------------------------
   * 📘 REGIMES
   * ----------------------------------------- */

  async addRegime(institutionId: string, regimeId: string) {
    const regime = this.institutionRegimeRepo.create({
      institutionId,
      regimeId,
    });
    return await this.institutionRegimeRepo.save(regime);
  }

  async findRegimes(institutionId: string) {
    return await this.institutionRegimeRepo.find({
      where: { institutionId },
      relations: ['regime', 'regime.periods', 'regime.periods.range'],
      select: {
        regime: {
          id: true,
          name: true,
          periods: {
            id: true,
            name: true,
            range: {
              startDate: true,
              endDate: true,
            },
          },
        },
      },
    });
  }

  /* -----------------------------------------
   * ⏰ TURNOS
   * ----------------------------------------- */

  async createShift(payload: CreateShiftDto) {
    return await this.shiftRepo.save(payload);
  }

  async findShift(institutionId: string) {
    return await this.shiftRepo.find({ where: { institutionId } });
  }

  /* -----------------------------------------
   * 🏫 SALAS
   * ----------------------------------------- */

  async createRoom(payload: CreateRoomDto) {
    return await this.roomRepo.save(payload);
  }

  async findRooms(institutionId: string) {
    return await this.roomRepo.find({ where: { institutionId } });
  }

  /* -----------------------------------------
   * 📚 DISCIPLINAS
   * ----------------------------------------- */

  async createDiscipline(payload: CreateDisciplineDto) {
    const code = await this.generateDisciplineCode(payload.name);
    const discipline = this.disciplineRepo.create({
      ...payload,
      code,
    });
    return await this.disciplineRepo.save(discipline);
  }

  async findDisciplines(institutionId: string) {
    return await this.disciplineRepo.find({ where: { institutionId } });
  }

  private async generateDisciplineCode(name: string): Promise<string> {
    // Pega as 3 primeiras letras do nome em maiúsculo
    const prefix = name.substring(0, 3).toUpperCase();

    // Conta quantas disciplinas já têm esse prefixo
    const count = await this.disciplineRepo.count({
      where: { code: Like(`${prefix}%`) },
    });

    // Gera o número sequencial (ex: 01, 02, 03)
    const number = String(count + 1).padStart(2, '0');

    return `${prefix}${number}`;
  }
}
