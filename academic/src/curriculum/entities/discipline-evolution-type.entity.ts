import { EvolutionTypeEntity } from "src/evolution/entities/evolution-type.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { CurriculumHasDisciplineEntity } from "./has-discipline.entity";

@Entity('discipline_has_evolution_types')
export class DisciplineHasEvolutionTypeEntity {
  @PrimaryColumn({ type: 'uuid', name: 'discipline_id', nullable: false })
  disciplineId: string;

  @PrimaryColumn({ type: 'uuid', name: 'evolution_type_id', nullable: false })
  evolutionTypeId: string;

  @Column({ type: 'integer', name: 'percentage', nullable: false })
  percentage: number;

  @ManyToOne(
    () => EvolutionTypeEntity,
    (evolutionType) => evolutionType.disciplineEvolutionType
  )
  @JoinColumn({ name: 'evolution_type_id' })
  evolutionType: EvolutionTypeEntity;

  @ManyToOne(
    () => CurriculumHasDisciplineEntity,
    (curriculumDiscipline) => curriculumDiscipline.evolutionTypes
  )
  @JoinColumn({ name: 'discipline_id' })
  discipline: CurriculumHasDisciplineEntity;
}
