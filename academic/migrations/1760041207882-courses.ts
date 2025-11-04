import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Courses1760041207882 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'courses',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['Activo', 'Inactivo', 'Encerrado'],
            default: `'Activo'`,
            isNullable: true,
          },
          {
            name: 'institution_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'coordinator_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'minimum_age',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'maximum_age',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'image',
            type: 'text',
            isNullable: true,
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
            columnNames: ['institution_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'institutions',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['coordinator_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'employees',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
