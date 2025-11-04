import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Shifts1760125474101 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'shifts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()', // Correção aqui, aspas simples e sem função
          },
          {
            name: 'institution_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'start',
            type: 'time',
            isNullable: false,
          },
          {
            name: 'end',
            type: 'time',
            isNullable: false,
          },
           {
            name: 'status',
            type: 'boolean',
            isNullable: false,
            default: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['institution_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'institutions',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
