import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class EvolutionType1761731613569 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'evolution_types',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'institution_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['institution_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'institutions',
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(): Promise<void> {}
}
