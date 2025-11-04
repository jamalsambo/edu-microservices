import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from './entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  async create(permission: CreatePermissionDto): Promise<PermissionEntity> {
    return await this.permissionRepository.save(permission);
  }
  async findAll(): Promise<PermissionEntity[]> {
    return await this.permissionRepository.find();
  }
}
