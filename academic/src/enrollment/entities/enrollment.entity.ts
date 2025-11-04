/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EnrollStatusEnum } from '../enum/enroll-status.enum';
import { AdmissionTypeStatusEnum } from '../enum/admission-type-status.enum';
import { ClassEntity } from 'src/class/entities/class.entity';
import { StudentEntity } from 'src/student/entities/student.entity';

@Entity('enrollments')
export class EnrollmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  number: string;

  @Column({ type: 'uuid', name: 'institution_id', nullable: false })
  institutionId: string;

  @Column({ type: 'uuid', name: 'student_id', nullable: true })
  studentId: string;

  @Column({ type: 'uuid', name: 'class_id', nullable: false })
  classId: string;

  @Column({ type: 'uuid', name: 'invoice_id', nullable: true })
  invoiceId: string;

  @Column({
    type: 'enum',
    name: 'status',
    nullable: false,
    enum: EnrollStatusEnum,
    default: EnrollStatusEnum.Activo,
  })
  status: EnrollStatusEnum;

  @Column({
    type: 'enum',
    name: 'admission_type',
    nullable: false,
    enum: EnrollStatusEnum,
    default: AdmissionTypeStatusEnum.Novo,
  })
  admissionType: AdmissionTypeStatusEnum;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @ManyToOne(() => ClassEntity, (classe) => classe.enrollments)
  @JoinColumn({ name: 'class_id'})
  classe: ClassEntity

  @ManyToOne(() => StudentEntity, (student) => student.enrollments)
  @JoinColumn({ name: 'student_id'})
  student: StudentEntity

}
