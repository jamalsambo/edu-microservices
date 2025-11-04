import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Provinces1758473993620 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'provinces',
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
            name: 'country_id',
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
            columnNames: ['country_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'countries',
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );

    await queryRunner.query(`
        INSERT INTO provinces (id, name, country_id)
        VALUES
        ('1b737cb6-8c40-489a-a994-884d4119b440', 'Maputo', '7a0b9c15-3d01-451d-b56b-f3e5a3743d61'),
        ('e91075e5-1248-4e53-bab9-ea88f628c77e', 'Gaza', '7a0b9c15-3d01-451d-b56b-f3e5a3743d61'),
        ('6173391b-6a09-45d0-a9ed-fe137f52a5f9', 'Inhambane', '7a0b9c15-3d01-451d-b56b-f3e5a3743d61'),
        ('a36d6839-6b05-4399-b806-0cc300807535', 'Nampula', '7a0b9c15-3d01-451d-b56b-f3e5a3743d61'),
        ('ccbd934e-d1c1-44c1-9525-eb03ba18fdcc', 'Sofala', '7a0b9c15-3d01-451d-b56b-f3e5a3743d61'),
        ('e83d973a-4a86-49a9-bad3-a26f70d52634', 'Tete', '7a0b9c15-3d01-451d-b56b-f3e5a3743d61'),
        ('027f6dd1-06b2-4f2f-aedf-6852e4c8bab2', 'Zambézia', '7a0b9c15-3d01-451d-b56b-f3e5a3743d61'),
        ('c9ee69df-4fe4-4c25-b1d6-672991fdab31', 'Cabo Delgado', '7a0b9c15-3d01-451d-b56b-f3e5a3743d61'),
        ('f2eeae39-c632-4462-921e-1bfcbd4c0158', 'Niassa', '7a0b9c15-3d01-451d-b56b-f3e5a3743d61'),
        ('6d16bb62-8417-4013-ba34-62806a0374b4', 'Manica', '7a0b9c15-3d01-451d-b56b-f3e5a3743d61')
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('provinces');
  }
}
