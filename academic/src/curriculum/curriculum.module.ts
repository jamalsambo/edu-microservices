import { Module } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { CurriculumController } from './curriculum.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurriculumEntity } from './entities/curriculum.entity';
import { CurriculumHasDisciplineEntity } from './entities/has-discipline.entity';
import { DisciplineHasEvolutionTypeEntity } from './entities/discipline-evolution-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CurriculumEntity, CurriculumHasDisciplineEntity, DisciplineHasEvolutionTypeEntity])],
  controllers: [CurriculumController],
  providers: [CurriculumService],
  exports: [CurriculumService],
})
export class CurriculumModule {}
