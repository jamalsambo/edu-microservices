/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CoursetatusEnum } from '../enum/course-status.enum';
import { InstitutionsEntity } from 'src/institution/entities/institution.entity';
import { EmployeeEntity } from 'src/employee/entities/employee.entity';
import { ClassEntity } from 'src/class/entities/class.entity';

@Entity('courses')
export class CourseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  /* Dados gerais */
  @Column({ name: 'institution_id', type: 'uuid', nullable: false })
  institutionId: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({
    type: 'simple-enum',
    name: 'status',
    nullable: false,
    enum: CoursetatusEnum,
    default: CoursetatusEnum.Activo,
  })
  status: CoursetatusEnum;

  @Column({ type: 'uuid', name: 'coordinator_id', nullable: true })
  coordinatorId: string;

  @Column({ type: 'int', name: 'minimum_age', nullable: true })
  minimumAge: number;

  @Column({ type: 'int', name: 'maximum_age', nullable: true })
  maximumAge: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => InstitutionsEntity, (institution) => institution.courses)
  @JoinColumn({ name: 'institution_id' })
  institution: InstitutionsEntity[];

  @ManyToOne(() => EmployeeEntity, (employee) => employee.courses)
  @JoinColumn({ name: 'coordinator_id' })
  coordinator: EmployeeEntity;

  @OneToMany(() => ClassEntity, (classe) => classe.course)
  classes: ClassEntity[];
}
