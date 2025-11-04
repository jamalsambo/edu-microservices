import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class Districts1758475524738 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'districts',
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
            name: 'province_id',
            type: 'uuid',
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
        foreignKeys: [
          {
            columnNames: ['province_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'provinces',
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );

    await queryRunner.query(`
        INSERT INTO districts (id, name, province_id)
        VALUES
        ('d8b974a3-3cab-4475-a78c-f7a576bf2a42', 'Beira', 'ccbd934e-d1c1-44c1-9525-eb03ba18fdcc'),
        ('3ca5580e-3c36-4699-be5b-4824afa34c27', 'Búzi', 'ccbd934e-d1c1-44c1-9525-eb03ba18fdcc'),
        ('${uuidv4()}', 'Caia', 'ccbd934e-d1c1-44c1-9525-eb03ba18fdcc'),
        ('${uuidv4()}', 'Chemba', 'ccbd934e-d1c1-44c1-9525-eb03ba18fdcc'),
        ('${uuidv4()}', 'Cheringoma', 'ccbd934e-d1c1-44c1-9525-eb03ba18fdcc'),
        ('${uuidv4()}', 'Chibabava', 'ccbd934e-d1c1-44c1-9525-eb03ba18fdcc'),
        ('${uuidv4()}', 'Dondo', 'ccbd934e-d1c1-44c1-9525-eb03ba18fdcc'),
        ('${uuidv4()}', 'Gorongosa', 'ccbd934e-d1c1-44c1-9525-eb03ba18fdcc'),
        ('${uuidv4()}', 'Machanga', 'ccbd934e-d1c1-44c1-9525-eb03ba18fdcc'),
        ('${uuidv4()}', 'Maringué', 'ccbd934e-d1c1-44c1-9525-eb03ba18fdcc'),
        ('${uuidv4()}', 'Marromeu', 'ccbd934e-d1c1-44c1-9525-eb03ba18fdcc'),
        ('${uuidv4()}', 'Muanza', 'ccbd934e-d1c1-44c1-9525-eb03ba18fdcc'),
        ('${uuidv4()}', 'Nhamatanda', 'ccbd934e-d1c1-44c1-9525-eb03ba18fdcc')
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('districts');
  }
}
