import { Module } from '@nestjs/common';
import { EvolutionService } from './evolution.service';
import { EvolutionController } from './evolution.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvolutionTypeEntity } from './entities/evolution-type.entity';
import { EvolutionEntity } from './entities/evolution.entity';
import { StudentModule } from 'src/student/student.module';
import { StudentEntity } from 'src/student/entities/student.entity';
import { TransformEvolutionData } from 'src/services/transform-evolution-data.service';

@Module({
  imports: [TypeOrmModule.forFeature([EvolutionEntity, EvolutionTypeEntity, StudentEntity]), StudentModule],
  controllers: [EvolutionController],
  providers: [EvolutionService, TransformEvolutionData],
  exports: [EvolutionService],
})
export class EvolutionModule {}
