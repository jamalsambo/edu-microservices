import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CurriculumHasDiscipline1760114569173
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'curriculum_has_discipline',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: false,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'curriculum_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'discipline_id',
            type: 'uuid',
            isNullable: false,
          },
           {
            name: 'period_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'workload',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'exame',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'participation',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'critical',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'year',
            type: 'int',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['curriculum_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'curriculums',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['discipline_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'disciplines',
            onDelete: 'CASCADE',
          },
           {
            columnNames: ['period_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'periods',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
