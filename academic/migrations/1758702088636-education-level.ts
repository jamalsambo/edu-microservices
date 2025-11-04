/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class EducationLeve1758702088636 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'education_level',
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
      }),
      true,
    );

    await queryRunner.query(`
      INSERT INTO education_level (id, name)
      VALUES 
        ('82db4edd-1abc-4642-a5e3-c72bf041624c', 'Jardim de Infancia'),
        ('5dbc33a0-96c2-4d11-9f9c-82cfc9c41ebe', 'Ensino Geral'),
        ('c98afbc3-3e17-4b6e-bac8-eedce0d06987', 'Ensino Tecnico'),
        ('bd5c3969-00d3-432e-9e81-1faa7f4a50e6', 'Ensino Livre');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('education_level');
  }
}
