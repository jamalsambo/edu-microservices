import { ClassEntity } from 'src/class/entities/class.entity';
import { CurriculumHasDisciplineEntity } from 'src/curriculum/entities/has-discipline.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { EmployeeEntity } from './employee.entity';

@Entity('employee_teachings')
export class EmployeeTeachingsEntity {
  @PrimaryColumn({ name: 'employee_id', type: 'uuid', nullable: false })
  employeeId: string;

  @PrimaryColumn({ name: 'classe_id', type: 'uuid', nullable: false })
  classeId: string;

  @PrimaryColumn({ name: 'discipline_id', type: 'uuid', nullable: false })
  disciplineId: string;

  @OneToOne(
    () => CurriculumHasDisciplineEntity,
    (discipline) => discipline.teaching,
  )
  @JoinColumn({ name: 'discipline_id' })
  discipline: CurriculumHasDisciplineEntity;

  @ManyToOne(() => ClassEntity, (classEntity) => classEntity.teachings)
  @JoinColumn({ name: 'classe_id' })
  classe: ClassEntity;

    @ManyToOne(() => EmployeeEntity, employee => employee.teachings)
    @JoinColumn({ name: 'employee_id'})
    employee: EmployeeEntity
}
