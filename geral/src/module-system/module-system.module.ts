import { Module } from '@nestjs/common';
import { ModuleSystemService } from './module-system.service';
import { ModuleSystemController } from './module-system.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleSystemEntity } from './entities/module-system.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleSystemEntity])],
  controllers: [ModuleSystemController],
  providers: [ModuleSystemService],
  exports: [ModuleSystemService],
})
export class ModuleSystemModule {}
