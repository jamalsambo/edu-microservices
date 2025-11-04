import { CourseEntity } from 'src/course/entities/course.entity';
import { CurriculumEntity } from 'src/curriculum/entities/curriculum.entity';
import { EmployeeTeachingsEntity } from 'src/employee/entities/teachings.entity';
import { EnrollmentEntity } from 'src/enrollment/entities/enrollment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('classes')
export class ClassEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'course_id', type: 'uuid', nullable: false })
  courseId: string;

  @Column({ type: 'uuid', name: 'curriculum_id', nullable: true })
  curriculumId: string;

  @Column({ type: 'varchar', name: 'type_teaching', nullable: false })
  typeTeaching: string;

  @Column({ type: 'integer', name: 'vacancy_limit', nullable: false })
  vacancyLimit: number;

  @Column({ name: 'start_date', type: 'date', nullable: false })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date', nullable: false })
  endDate: Date;

  @Column({ type: 'uuid', name: 'shift_id', nullable: false })
  shiftId: string;

  @Column({
    type: 'enum',
    enum: ['A', 'B', 'C'],
    nullable: true,
  })
  area?: 'A' | 'B' | 'C';

  @Column({ type: 'uuid', name: 'room_id', nullable: false })
  roomId: string;

  @Column({ type: 'uuid', name: 'leader', nullable: true })
  leader: string;

  @Column({
    type: 'decimal',
    name: 'monthly_fee',
    precision: 5,
    scale: 2,
    default: 0,
    nullable: true,
  })
  monthlyFee: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => CourseEntity, (course) => course.classes)
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;

  @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.classe)
  enrollments: EnrollmentEntity[];

  @ManyToOne(() => CurriculumEntity, (curriculum) => curriculum.classes)
  @JoinColumn({ name: 'curriculum_id'})
  curriculum: CurriculumEntity

  @OneToMany(() => EmployeeTeachingsEntity, (employeeTeaching) => employeeTeaching.classe)
  teachings: EmployeeTeachingsEntity[]
}
