import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { InstitutionService } from 'src/institution/institution.service';
import { InstitutionsEntity } from 'src/institution/entities/institution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, InstitutionsEntity])],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
