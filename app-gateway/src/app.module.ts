import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth/auth.controller';
import { InstitutionsController } from './academic/institutions.controller';
import { EmployeeController } from './academic/employee.controller';
import { BasicInformationController } from './academic/basic-information.controller';
import { GeralController } from './geral/geral.controller';
import { CourseController } from './academic/course.controller';
import { RegimeController } from './academic/institution/regime.controller';
import { ClassController } from './academic/class/class.controller';
import { CurriculumController } from './academic/institution/curriculum.controller';
import { EnrollmentController } from './academic/enrollment/enroll.controller';
import { StudentController } from './academic/student/student.controller';
import { EvolutionController } from './academic/evolution/evolution.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // torna disponível em toda a aplicação
    }),
    ClientsModule.register([
      {
        name: 'APP_GATEWAY_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'redis',
          port: 6379,
        },
      },
    ]),
  ],
  controllers: [
    AppController,
    UsersController,
    AuthController,
    InstitutionsController,
    EmployeeController,
    BasicInformationController,
    GeralController,
    CourseController,
    RegimeController,
    ClassController,
    CurriculumController,
    EnrollmentController,
    StudentController,
    EvolutionController
  ],
  providers: [AppService],
})
export class AppModule {}
