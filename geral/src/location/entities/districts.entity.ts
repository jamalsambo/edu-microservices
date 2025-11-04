/* eslint-disable prettier/prettier */
import { ProvincesEntity } from './provinces.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('districts')
export class DistrictsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'province_id', type: 'varchar', nullable: false })
  provinceId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ProvincesEntity, (province) => province.districts)
  @JoinColumn({ name: 'province_id' })
  province: ProvincesEntity;
}
