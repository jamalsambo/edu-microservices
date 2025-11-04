/* eslint-disable prettier/prettier */
import { PermissionItemsEntity } from 'src/permission/entities/permission-items.entity'; 
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_permission_items')
export class UserPermissionItemsEntity {
  @PrimaryColumn({ type: 'uuid', name: 'user_id' })
  userId: string;

  @PrimaryColumn({ type: 'uuid', name: 'permission_item_id' })
  permissionItemId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => PermissionItemsEntity, (item) => item.permissionItem)
  @JoinColumn({ name: 'permission_item_id' })
  permission: PermissionItemsEntity;
}
