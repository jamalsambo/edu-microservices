/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PermissionEntity } from './permission.entity';
import { UsersEntity } from 'src/users/entities/user.entity'; 
import { UserPermissionItemsEntity } from 'src/users/entities/user-permission-items.entity'; 

@Entity('permission_items')
export class PermissionItemsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  key: string;

  @Column({ type: 'uuid', name: 'permission_id', nullable: true })
  permissionId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  
  @ManyToMany(() => UsersEntity, (permission) => permission.permissionsItems)
  @JoinTable()
  users: UsersEntity[];

  @ManyToOne(() => PermissionEntity, (permission) => permission.items)
  @JoinColumn({ name: 'permission_id' })
  permission: PermissionEntity;

  @OneToMany(() => UserPermissionItemsEntity, userPermission => userPermission.permission)
  permissionItem: UserPermissionItemsEntity[]
}
