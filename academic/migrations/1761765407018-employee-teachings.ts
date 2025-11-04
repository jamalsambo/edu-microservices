import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class EmployeeTeachings1761765407018 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
      new Table({
        name: 'employee_teachings',
        columns: [
          {
            name: 'employee_id',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'classe_id',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
          },
           {
            name: 'discipline_id',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['employee_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'employees',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['classe_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'classes',
            onDelete: 'CASCADE',
          },
           {
            columnNames: ['discipline_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'curriculum_has_discipline',
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
