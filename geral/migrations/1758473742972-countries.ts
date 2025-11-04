import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Countries1758473742972 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'countries',
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
      INSERT INTO countries (id, name)
      VALUES 
        ('7a0b9c15-3d01-451d-b56b-f3e5a3743d61', 'Moçambique'),
        ('bfccb045-4795-4e2d-a42c-5c591dd21eab', 'Angola'),
        ('7a0b9c15-3d01-451d-b56b-f3e5a3743d62', 'Brazil'),
        ('7a0b9c15-3d01-451d-b56b-f3e5a3743d63', 'Portugal');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('countries');
  }
}
