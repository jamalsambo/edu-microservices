/* eslint-disable prettier/prettier */
import { RegimeEntity } from 'src/regime/entities/regime.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { InstitutionsEntity } from './institution.entity';

@Entity('institution_has_regimes')
export class InstitutionRegimeEntity {
  @PrimaryColumn({ type: 'uuid', name: 'institution_id', nullable: false })
  institutionId: string;

  @PrimaryColumn({ type: 'uuid', name: 'regime_id', nullable: false })
  regimeId: string;

  @ManyToOne(() => InstitutionsEntity, (institution) => institution.regimes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'institution_id', referencedColumnName: 'id' })
  institution: InstitutionsEntity;

  @ManyToOne(() => RegimeEntity, (regime) => regime.institutionRegimes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'regime_id', referencedColumnName: 'id' })
  regime: RegimeEntity;
}

