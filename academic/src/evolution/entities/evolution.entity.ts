import { StudentEntity } from 'src/student/entities/student.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('evolutions')
export class EvolutionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'student_id', nullable: false })
  studentId?: string;

  @Column({ type: 'uuid', name: 'discipline_id', nullable: false })
  disciplineId?: string;

  @Column({ type: 'uuid', name: 'class_id', nullable: false })
  classId?: string;

  @Column({ type: 'uuid', name: 'evolution_type_id', nullable: false})
  evolutionTypeId: string

  @Column({ type: 'decimal', nullable: true })
  note?: number;

  @Column({ type: 'date', name: 'date_completion', nullable: false })
  dateCompletion: Date;

  @Column({ type: 'text', nullable: true })
  observations?: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @ManyToOne(() => StudentEntity, (student) => student.evolutions)
  @JoinColumn({ name: 'student_id'})
  student: StudentEntity
}
