import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'data-source';
import { InstitutionModule } from './institution/institution.module';
import { BasicInformationModule } from './basic-information/basic-information.module';
import { EmployeeModule } from './employee/employee.module';
import { CourseModule } from './course/course.module';
import { CurriculumModule } from './curriculum/curriculum.module';
import { RegimeModule } from './regime/regime.module';
import { ClassModule } from './class/class.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { StudentModule } from './student/student.module';
import { EvolutionModule } from './evolution/evolution.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // torna disponível em toda a aplicação
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    InstitutionModule,
    BasicInformationModule,
    EmployeeModule,
    CourseModule,
    CurriculumModule,
    RegimeModule,
    ClassModule,
    EnrollmentModule,
    StudentModule,
    EvolutionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
