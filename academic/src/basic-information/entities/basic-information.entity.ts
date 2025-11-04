/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { BasicInformationGenderEnum } from '../enum/basic-information-gender.enum';
import { BasicInformationMaritalStatusEnum } from '../enum/basic-information-marita-status.enum';
// import { StudentEntity } from '../../../../modules/academic/student/entity/student.entity';
import { EmployeeEntity } from 'src/employee/entities/employee.entity';

@Entity('basic_information')
export class BasicInformationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'full_name', type: 'varchar', nullable: false })
  fullName: string;

  @Column({ name: 'date_of_birth', type: 'date', nullable: false })
  dateBirth: string;

  @Column({
    type: 'simple-enum',
    enum: BasicInformationGenderEnum,
    nullable: false,
  })
  gender: BasicInformationGenderEnum;

  @Column({
    name: 'marital_status',
    type: 'simple-enum',
    enum: BasicInformationMaritalStatusEnum,
    nullable: false,
  })
  maritalStatus: BasicInformationMaritalStatusEnum;

  @Column({ name: 'country_id', type: 'uuid', nullable: false })
  countryId: string;

  @Column({ name: 'natural_country', type: 'uuid', nullable: false })
  naturalCountry: string;

  @Column({ name: 'natural_province', type: 'uuid', nullable: false })
  naturalProvince: string;

  @Column({ name: 'district_id', type: 'uuid', nullable: false })
  districtId: string;

  @Column({ type: 'varchar', nullable: true })
  neighborhood: string | null;

  @Column({ name: 'house_number', type: 'varchar', nullable: true })
  houseNumber: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //   @OneToMany(() => StudentEntity, student => student.basicInformation)
  //   student: StudentEntity;

  @OneToMany(() => EmployeeEntity, (employee) => employee.basicInformation)
  employee: EmployeeEntity[];
}
