import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StudentStatusEnum } from '../enum/student-status.enum';
import { EnrollmentEntity } from 'src/enrollment/entities/enrollment.entity';
import { BasicInformationEntity } from 'src/basic-information/entities/basic-information.entity';
import { EvolutionEntity } from 'src/evolution/entities/evolution.entity';

@Entity('students')
export class StudentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  number: string;

  @Column({ type: 'varchar', name: 'process_number', nullable: true })
  processNumber?: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId: string;

  @Column({ name: 'institution_id', type: 'uuid', nullable: true })
  institutionId: string;

  @Column({ name: 'basic_information_id', type: 'uuid', nullable: true })
  basicInformationId: string;

  @Column({
    type: 'enum',
    name: 'status',
    nullable: false,
    enum: StudentStatusEnum,
    default: StudentStatusEnum.Activo,
  })
  status: StudentStatusEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.student)
  enrollments: EnrollmentEntity[] | EnrollmentEntity | null;

  @OneToOne(
    () => BasicInformationEntity,
    (basicInformation) => basicInformation.employee,
  )
  @JoinColumn({ name: 'basic_information_id' })
  basicInformation: BasicInformationEntity;

  @OneToMany(() => EvolutionEntity, (evolutions) => evolutions.student)
  evolutions: EvolutionEntity[]
}
