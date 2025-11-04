/* eslint-disable prettier/prettier */
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { InstitutionsEntity } from './institution.entity';

@Entity('institution_modules')
export class InstitutionModuleEntity {
  @PrimaryColumn({ type: 'uuid', name: 'institution_id' })
  institutionId: string;

  @PrimaryColumn({ type: 'uuid', name: 'module_id' })
  moduleId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => InstitutionsEntity,
    (institution) => institution.modules,
  )
  @JoinColumn({ name: 'institution_id'})
  institution: InstitutionsEntity[];
}
