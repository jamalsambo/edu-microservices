import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Institutions1758702145064 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'institutions',
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
            enum: ['Activo', 'Suspenso', 'Encerado', 'Desactivo'],
            default: `'Activo'`,
            isNullable: true,
          },
          {
            name: 'parent_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'district_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'education_id',
            type: 'uuid',
            isNullable: true, // ou false dependendo da sua necessidade
          },
          {
            name: 'neighborhood',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'nuit',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'tax',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
            default: 0,
          },
          {
            name: 'main_contact',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'alternative_contact',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'fixed',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'logo',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'domain',
            type: 'varchar',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'about_us',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'worth',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'vision',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'mission',
            type: 'text',
            isNullable: true,
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
        foreignKeys: [
          {
            columnNames: ['education_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'education_level',
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
