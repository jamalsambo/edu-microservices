/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { InstitutionsEntity } from './institution.entity';

@Entity('education_level')
export class EducationLevelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => InstitutionsEntity,
    (institutionLevel) => institutionLevel.educationLevel,
  )
  institutions: InstitutionsEntity[];
}
