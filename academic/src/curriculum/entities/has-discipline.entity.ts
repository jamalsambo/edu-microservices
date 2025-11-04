import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CurriculumEntity } from './curriculum.entity';
import { DisciplineEntity } from 'src/institution/entities/discipline.entity';
import { PeriodEntity } from 'src/regime/entities/periods.entity';
import { DisciplineHasEvolutionTypeEntity } from './discipline-evolution-type.entity';
import { EmployeeTeachingsEntity } from 'src/employee/entities/teachings.entity';

@Entity('curriculum_has_discipline')
export class CurriculumHasDisciplineEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'curriculum_id', default: true })
  curriculumId: string;

  @Column({ type: 'uuid', name: 'discipline_id', default: true })
  disciplineId: string;

  @Column({ type: 'uuid', name: 'period_id', nullable: false })
  periodId: string;

  @Column({ type: 'int', name: 'workload', nullable: false })
  workload: number;

  @Column({ type: 'boolean', name: 'exame', nullable: false, default: false })
  exame: boolean;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  participation: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  critical: boolean;

  @Column({ type: 'int', name: 'year', nullable: false })
  year: number;

  @ManyToOne(
    () => CurriculumEntity,
    (curriculum) => curriculum.curriculumDiscipline,
  )
  @JoinColumn({ name: 'curriculum_id' })
  curriculum: CurriculumEntity;

  @ManyToOne(
    () => DisciplineEntity,
    (curriculum) => curriculum.curriculumDiscipline,
  )
  @JoinColumn({ name: 'discipline_id' })
  discipline: DisciplineEntity;

  @ManyToOne(
    () => PeriodEntity,
    (curriculum) => curriculum.curriculumDiscipline,
  )
  @JoinColumn({ name: 'period_id' })
  period: PeriodEntity;

  @OneToMany(
    () => DisciplineHasEvolutionTypeEntity,
    (disciplineEvolution) => disciplineEvolution.discipline,
  )
  evolutionTypes: DisciplineHasEvolutionTypeEntity[];

  @OneToOne(
    () => EmployeeTeachingsEntity,
    (employeeTeaching) => employeeTeaching.discipline,
  )
  teaching: EmployeeTeachingsEntity;
}
