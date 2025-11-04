import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class DisciplineHasEvolutionType1761741402890 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
              new Table({
                name: 'discipline_has_evolution_types',
                columns: [
                  {
                    name: 'discipline_id',
                    type: 'uuid',
                    isNullable: false,
                    isPrimary: true
                  },
                  {
                    name: 'evolution_type_id',
                    type: 'uuid',
                    isNullable: false,
                    isPrimary: true
                  },
                  {
                    name: 'percentage',
                    type: 'integer',
                    isNullable: false,
                  },
                ],
                foreignKeys: [
                  {
                    columnNames: ['discipline_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'curriculum_has_discipline',
                    onDelete: 'CASCADE',
                  },
                   {
                    columnNames: ['evolution_type_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'evolution_types',
                    onDelete: 'CASCADE',
                  },
                ],
              }),
              true,
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
