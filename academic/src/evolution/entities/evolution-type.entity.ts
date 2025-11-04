import { DisciplineHasEvolutionTypeEntity } from 'src/curriculum/entities/discipline-evolution-type.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('evolution_types')
export class EvolutionTypeEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'uuid', name: 'institution_id', nullable: false })
  institutionId: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  type: string;

  @OneToMany(
    () => DisciplineHasEvolutionTypeEntity,
    (disciplineEvolution) => disciplineEvolution.evolutionType,
  )
  disciplineEvolutionType: DisciplineHasEvolutionTypeEntity[];
}
