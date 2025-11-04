/* eslint-disable prettier/prettier */
import { DistrictsEntity } from './districts.entity';
import { CountriesEntity } from './countries.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn
  } from 'typeorm';

  @Entity('provinces')
  export class ProvincesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ name: 'country_id', type: 'varchar', nullable: false })
    countryId: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => DistrictsEntity, (district) => district.province)
    districts: DistrictsEntity[];

    @ManyToOne(() => CountriesEntity, (country) => country.provinces)
    @JoinColumn({ name: 'country_id'})
    country: CountriesEntity;
  }
  