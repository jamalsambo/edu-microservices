/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BasicInformationEntity } from 'src/basic-information/entities/basic-information.entity';
import { CourseEntity } from 'src/course/entities/course.entity';
import { InstitutionsEntity } from 'src/institution/entities/institution.entity';
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
import { EmployeeTeachingsEntity } from './teachings.entity';

@Entity('employees')
export class EmployeeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  number: string;

  @Column({ name: 'user_id', type: 'varchar', nullable: true })
  userId: string;

  @Column({ name: 'institution_id', type: 'uuid', nullable: true })
  institutionId: string;

  @Column({ name: 'basic_information_id', type: 'uuid', nullable: true })
  basicInformationId: string;

  @Column({ type: 'varchar', nullable: true, default: 'Sim' })
  teacher: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => InstitutionsEntity, (institution) => institution.employees, {
    nullable: true,
  })
  @JoinColumn({ name: 'institution_id' })
  institution: InstitutionsEntity;

  @ManyToOne(() => BasicInformationEntity, (basic) => basic.employee, {
    nullable: true,
  })
  @JoinColumn({ name: 'basic_information_id' })
  basicInformation: BasicInformationEntity;

  @OneToMany(() => CourseEntity, course => course.coordinator)
  courses: CourseEntity[]

  @OneToMany(() => EmployeeTeachingsEntity, (employeeTeaching) => employeeTeaching.employee)
  teachings: EmployeeTeachingsEntity 
} 
