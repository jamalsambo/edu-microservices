import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Users1758296939178 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
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
            name: 'phone',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            isNullable: true,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'user_type_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'avantar',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'inactive',
            type: 'boolean',
            default: false,
          },
          {
            name: 'dt_inative',
            type: 'date',
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
            columnNames: ['user_type_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user_types',
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(): Promise<void> {}
}
