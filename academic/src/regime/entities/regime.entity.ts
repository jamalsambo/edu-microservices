/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PeriodEntity } from './periods.entity';
import { InstitutionRegimeEntity } from 'src/institution/entities/has-regimes.entity';

@Entity('regimes')
export class RegimeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @OneToMany(() => PeriodEntity, (period) => period.regime)
  periods: PeriodEntity[];

  @OneToMany(() => InstitutionRegimeEntity, (ir) => ir.regime)
  institutionRegimes: InstitutionRegimeEntity[];
}
