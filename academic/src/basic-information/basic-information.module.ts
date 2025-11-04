import { Module } from '@nestjs/common';
import { BasicInformationService } from './basic-information.service';
import { BasicInformationController } from './basic-information.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasicInformationEntity } from './entities/basic-information.entity';
import { EmployeeModule } from 'src/employee/employee.module';
import { EmployeeEntity } from 'src/employee/entities/employee.entity';
import { StudentModule } from 'src/student/student.module';
import { StudentEntity } from 'src/student/entities/student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BasicInformationEntity,
      EmployeeEntity,
      StudentEntity,
    ]),
    EmployeeModule,
    StudentModule,
  ],
  controllers: [BasicInformationController],
  providers: [BasicInformationService],
  exports: [BasicInformationService],
})
export class BasicInformationModule {}
