import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class PeriodsRange1760171437182 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'periods_range',
        columns: [
          {
            name: 'period_id',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'institution_id',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'start_date',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'end_date',
            type: 'date',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['period_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'periods',
            onDelete: 'CASCADE',
          },
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

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
