import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from './entities/employee.entity';
import { GenerateSortCodeService } from 'src/services/generate-sort-code.service';
import { EmployeeTeachingsEntity } from './entities/teachings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity, EmployeeTeachingsEntity])],
  controllers: [EmployeeController],
  providers: [EmployeeService, GenerateSortCodeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
