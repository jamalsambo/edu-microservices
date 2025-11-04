import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CurriculumHasDisciplineEntity } from './has-discipline.entity';
import { ClassEntity } from 'src/class/entities/class.entity';

@Entity('curriculums')
export class CurriculumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'uuid', name: 'regime_id', nullable: false })
  regimeId: string;

  @Column({ type: 'uuid', name: 'institution_id', nullable: false })
  institutionId: string;

  @OneToMany(() => CurriculumHasDisciplineEntity, (has) => has.curriculum)
  curriculumDiscipline: CurriculumHasDisciplineEntity[];

  @OneToMany(() => ClassEntity, (classe) => classe.curriculum)
  classes: ClassEntity[];

  //   @ManyToOne(() => Regime, { onDelete: 'CASCADE' })
  //   @JoinColumn({ name: 'regime_id' })
  //   regime: Regime;

  //   @ManyToOne(() => Institution, { onDelete: 'CASCADE' })
  //   @JoinColumn({ name: 'institution_id' })
  //   institution: Institution;
}
