/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  JoinColumn,
  BeforeUpdate,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserTypesEntity } from './user-types.entity';
import { PermissionItemsEntity } from 'src/permission/entities/permission-items.entity';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'display_name', type: 'varchar', nullable: false })
  displayName: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ name: 'user_type_id', type: 'varchar', nullable: false })
  userTypeId: string;

  @Column({ type: 'varchar', nullable: true })
  avantar: string;

  @Column({ type: 'boolean', default: false })
  inactive: boolean;

  @Column({ name: 'dt_inative', type: 'date', nullable: true })
  dtInative: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  @ManyToOne(() => UserTypesEntity, (userType) => userType.users)
  @JoinColumn({ name: 'user_type_id' })
  userType: UserTypesEntity;


  @ManyToMany(() => PermissionItemsEntity, (items) => items.users, {
    nullable: true,
  })
  @JoinTable({
    name: 'user_permission_items',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_item_id',
      referencedColumnName: 'id',
    },
  })
  permissionsItems: PermissionItemsEntity[];
}
