/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { RegimeEntity } from './regime.entity';
import { PeriodRangeEntity } from './period-range.entity';
import { CurriculumHasDisciplineEntity } from 'src/curriculum/entities/has-discipline.entity';

@Entity('periods')
export class PeriodEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'uuid', name: 'regime_id', nullable: false })
  regimeId: string;

  @ManyToOne(() => RegimeEntity, (regime) => regime.periods)
  @JoinColumn({ name: 'regime_id' })
  regime: RegimeEntity;

  @OneToOne(() => PeriodRangeEntity, (range) => range.period)
  range: PeriodRangeEntity;

   @OneToMany(() => CurriculumHasDisciplineEntity, (has) => has.discipline)
    curriculumDiscipline: CurriculumHasDisciplineEntity[];
}
