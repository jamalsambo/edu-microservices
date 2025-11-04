/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserTypesEntity } from './entities/user-types.entity';
import { UsersEntity } from './entities/user.entity';
import { UserPermissionItemsEntity } from './entities/user-permission-items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity,UserTypesEntity, UserPermissionItemsEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
