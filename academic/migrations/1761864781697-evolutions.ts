import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Evolutions1761864781697 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'evolutions',
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
            name: 'student_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'discipline_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'class_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'evolution_type_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'note',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'date_completion',
            type: 'date',
            isNullable: false,
          },
          { name: 'observations', type: 'text', isNullable: true },

          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['student_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'students',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['discipline_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'curriculum_has_discipline',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['class_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'classes',
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

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
