import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from './entities/employee.entity';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { GenerateSortCodeService } from 'src/services/generate-sort-code.service';
import { AddEmployeeTeachingsDto } from './dto/add-teachings.dto';
import { EmployeeTeachingsEntity } from './entities/teachings.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,

    @InjectRepository(EmployeeTeachingsEntity)
    private readonly employeeTeachingsRepo: Repository<EmployeeTeachingsEntity>,

    private readonly generateSortCodeService: GenerateSortCodeService,
  ) {}

  async create(data: CreateEmployeeDto) {
    const employee = this.employeeRepository.create(data);
    const sortCode = await this.generateSortCodeService.generatedSortCode();
    const year = new Date().getFullYear();

    employee.number = `EP.${sortCode}.${year}`;
    await this.employeeRepository.save(employee);

    return employee;
  }

  findAll() {
    return this.employeeRepository.find({
      relations: ['basicInformation'],
    });
  }

  async findOneOrFail(
    conditions: FindOptionsWhere<EmployeeEntity>,
    options?: FindOneOptions<EmployeeEntity>,
  ) {
    try {
      const user = await this.employeeRepository.findOneOrFail({
        where: conditions,
        relations: [
          'institution',
          'institution.educationLevel',
          'institution.children',
          'institution.children.educationLevel',
        ],
        select: {
          id: true,
          number: true,
          basicInformationId: true,
          teacher: true,
          userId: true,
          institution: {
            id: true,
            name: true,
            educationLevel: {
              name: true,
            },
            children: {
              id: true,
              name: true,
              educationLevel: {
                name: true,
              },
            },
          },
        },
        ...options,
      });

      return user;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('Funcionário não encontrado');
    }
  }

  async update(id: string, data: UpdateEmployeeDto): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.findOne({
      where: { id: id },
    });
    this.employeeRepository.merge(employee, data);
    return await this.employeeRepository.save(employee);
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }

  async addTeachings(data: AddEmployeeTeachingsDto) {
    return await this.employeeTeachingsRepo.save(data);
  }
}
