import { Injectable } from '@nestjs/common';
import { CreateBasicInformationDto } from './dto/create-basic-information.dto';
import { UpdateBasicInformationDto } from './dto/update-basic-information.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BasicInformationEntity } from './entities/basic-information.entity';
import { Repository } from 'typeorm';
import { EmployeeEntity } from 'src/employee/entities/employee.entity';
import { StudentEntity } from 'src/student/entities/student.entity';

@Injectable()
export class BasicInformationService {
  constructor(
    @InjectRepository(BasicInformationEntity)
    private readonly basicInformationRepository: Repository<BasicInformationEntity>,

    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,

    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}

  async create(createBasicInformationDto: CreateBasicInformationDto) {
    const info = await this.basicInformationRepository.save(
      createBasicInformationDto,
    );

    const { employeeId, studentId } = createBasicInformationDto;

    if (employeeId) {
      await this.employeeRepository.update(
        { id: employeeId },
        { basicInformationId: info.id },
      );
    } else if (studentId) {
      await this.studentRepository.update(
        { id: studentId },
        { basicInformationId: info.id },
      );
    }

    return info;
  }

  findOne(id: string) {
    return this.basicInformationRepository.findOne({ where: { id: id } });
  }

  async update(
    id: string,
    data: UpdateBasicInformationDto,
  ): Promise<BasicInformationEntity> {
    const basicInformation = await this.basicInformationRepository.findOne({
      where: { id: id },
    });
    this.basicInformationRepository.merge(basicInformation, data);
    return await this.basicInformationRepository.save(basicInformation);
  }
}
