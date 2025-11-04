import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Classes1760129849207 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'classes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()', // Correção aqui, aspas simples e sem função
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'course_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'curriculum_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'type_teaching',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'vacancy_limit',
            type: 'int',
            isNullable: false,
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
          {
            name: 'shift_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'area',
            type: 'enum',
            enum: ['A', 'B', 'C'],
            isNullable: true,
          },
          {
            name: 'room_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'leader',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'monthly_fee',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true, // Ou true, dependendo da sua necessidade
            default: "'0'",
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()', // Correto para gerar data automaticamente
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()', // Correto para gerar data automaticamente
          },
        ],
        foreignKeys: [
          {
            columnNames: ['course_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'courses',
          },
          {
            columnNames: ['curriculum_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'curriculums',
          },
          {
            columnNames: ['room_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'rooms',
          },
          {
            columnNames: ['shift_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'shifts',
          },
          {
            columnNames: ['leader'],
            referencedColumnNames: ['id'],
            referencedTableName: 'employees',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
