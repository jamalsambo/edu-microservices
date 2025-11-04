import { CurriculumHasDisciplineEntity } from 'src/curriculum/entities/has-discipline.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('disciplines')
export class DisciplineEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'institution_id', type: 'uuid', nullable: false })
  institutionId: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  code: string;

  @OneToMany(() => CurriculumHasDisciplineEntity, (has) => has.discipline)
  curriculumDiscipline: CurriculumHasDisciplineEntity[];
}
