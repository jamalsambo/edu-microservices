/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  OneToOne,
} from 'typeorm';
import { RegimeEntity } from './regime.entity';
import { PeriodEntity } from './periods.entity';

@Entity('periods_range')
export class PeriodRangeEntity {
  @PrimaryColumn({ type: 'uuid', name: 'institution_id', nullable: false })
  institutionId: string;

  @PrimaryColumn({ type: 'uuid', name: 'period_id', nullable: false })
  periodId: string;

  @Column({ type: 'date', name: 'start_date', nullable: false })
  startDate: Date;

  @Column({ type: 'date', name: 'end_date', nullable: false })
  endDate: Date;

  @OneToOne(() => PeriodEntity, (period) => period.range, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'period_id', referencedColumnName: 'id' })
  period: PeriodEntity;
}
