/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity('shifts')
export class ShiftsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'institution_id', type: 'uuid' })
  institutionId: string;

  @Column({ type: 'time', name: 'start', nullable: false })
  start: Date;

  @Column({ type: 'time', name: 'end', nullable: false })
  end: Date;

  @Column({ type: 'boolean', nullable: false, default: false})
  status: boolean
}
