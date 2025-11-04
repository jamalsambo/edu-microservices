import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserPermissions1759830324940 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_permission_items',
        columns: [
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'permission_item_id',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['permission_item_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'permission_items',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
