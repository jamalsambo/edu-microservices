/* eslint-disable prettier/prettier */
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
import { EducationLevelEntity } from './education-level.entity';
import { InstitutionStatusEnum } from 'src/enum/institution-status.enum';
import { EmployeeEntity } from 'src/employee/entities/employee.entity';
import { InstitutionModuleEntity } from './module.entity';
import { CourseEntity } from 'src/course/entities/course.entity';
import { InstitutionRegimeEntity } from './has-regimes.entity';

@Entity('institutions')
export class InstitutionsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', name: 'parent_id', nullable: true })
  parentId: string;

  @Column({ type: 'uuid', name: 'district_id', nullable: false })
  districtId: string;

  @Column({
    type: 'simple-enum',
    name: 'status',
    nullable: false,
    enum: InstitutionStatusEnum,
    default: InstitutionStatusEnum.Activo,
  })
  status: InstitutionStatusEnum;

  @Column({ type: 'varchar', name: 'neighborhood', nullable: false })
  neighborhood: string;

  @Column({ type: 'varchar', name: 'address', nullable: false })
  address: string;

  @Column({ type: 'varchar', name: 'nuit', nullable: false })
  nuit: string;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0,
    nullable: false,
  })
  tax: number;

  @Column({ type: 'varchar', name: 'main_contact', nullable: false })
  mainContact: string;

  @Column({ type: 'varchar', name: 'alternative_contact', nullable: true })
  alternativeContact: string;

  @Column({ type: 'varchar', name: 'fixed', nullable: true })
  fixed: string;

  @Column({ type: 'varchar', name: 'email', nullable: true })
  email: string;

  @Column({ type: 'varchar', name: 'logo', nullable: true })
  logo: string;

  @Column({ type: 'varchar', name: 'domain', nullable: true })
  domain: string;

  @Column({ type: 'text', name: 'about_us', nullable: true })
  aboutUs: string;

  @Column({ type: 'text', name: 'worth', nullable: true })
  worth: string;

  @Column({ type: 'text', name: 'vision', nullable: true })
  vision: string;

  @Column({ type: 'text', name: 'mission', nullable: true })
  mission: string;

  @Column({ type: 'uuid', name: 'education_id', nullable: true })
  educationId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => EducationLevelEntity,
    (educationLevel) => educationLevel.institutions,
  )
  @JoinColumn({ name: 'education_id' })
  educationLevel: EducationLevelEntity;

  @OneToMany(() => EmployeeEntity, (employee) => employee.institution)
  employees: EmployeeEntity[];

  @OneToMany(() => InstitutionModuleEntity, (module) => module.institution)
  modules: InstitutionModuleEntity[];

  @ManyToOne(() => InstitutionsEntity, (institution) => institution.children, {
    nullable: true,
  })
  @JoinColumn({ name: 'parent_id' })
  parent?: InstitutionsEntity;

  @OneToMany(() => InstitutionsEntity, (institution) => institution.parent)
  children: InstitutionsEntity[];

  @OneToMany(() => CourseEntity, (course) => course.institution)
  courses: CourseEntity[];

  @OneToMany(() => InstitutionRegimeEntity, (ir) => ir.institution)
  regimes: InstitutionRegimeEntity[];
}
