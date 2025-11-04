import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegimeEntity } from './entities/regime.entity';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { PeriodRangeEntity } from './entities/period-range.entity';
import { CreatePeriodRangeDto } from './dto/create-period-range.dto';

@Injectable()
export class RegimeService {
  constructor(
    @InjectRepository(RegimeEntity)
    private readonly regimeRepository: Repository<RegimeEntity>,

    @InjectRepository(PeriodRangeEntity)
    private readonly periodRangeRepository: Repository<PeriodRangeEntity>
  ){}

  async findAll() {
    return await this.regimeRepository.find()
  }

    async findOneOrFail(
      conditions: FindOptionsWhere<RegimeEntity>,
      options?: FindOneOptions<RegimeEntity>,
    ) {
      try {
          return await this.regimeRepository.findOneOrFail({
          where: conditions,
          relations: ['periods'],
          ...options,
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        throw new NotFoundException('Regime não encontrado');
      }
    }

  async createPeriodRange(institutionId: string, period_id: string, payload: CreatePeriodRangeDto) {
    const periodRange = this.periodRangeRepository.create({institutionId: institutionId, periodId: period_id, ...payload});
    return await this.periodRangeRepository.save(periodRange);
  }

}
