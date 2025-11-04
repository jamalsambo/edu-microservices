import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Students1760471904330 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'students',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'number',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'process_number',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'institution_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'basic_information_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['Activo', 'Inactivo', 'Suspenso', 'Expulso', 'Transferido'],
            isNullable: false,
            default: "'Activo'",
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
            columnNames: ['institution_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'institutions',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['basic_information_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'basic_information',
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
