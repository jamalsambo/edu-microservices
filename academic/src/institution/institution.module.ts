import { Module } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { InstitutionController } from './institution.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationLevelEntity } from './entities/education-level.entity';
import { InstitutionsEntity } from './entities/institution.entity';
import { InstitutionRegimeEntity } from './entities/has-regimes.entity';
import { ShiftsEntity } from './entities/shifts.entity';
import { RoomEntity } from './entities/room.entity';
import { DisciplineEntity } from './entities/discipline.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EducationLevelEntity,
      InstitutionsEntity,
      InstitutionRegimeEntity,
      ShiftsEntity,
      RoomEntity,
      DisciplineEntity,
  
    ]),
  ],
  controllers: [InstitutionController],
  providers: [InstitutionService],
  exports: [InstitutionService],
})
export class InstitutionModule {}
