import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AcadimicRegimes1760109741546 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'regimes',
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
        ],
      }),
      true,
    );

    await queryRunner.query(`
              INSERT INTO regimes (id, name)
              VALUES 
                ('82db4edd-1abc-4642-a5e3-c72bf041624f', 'Semestral'),
                ('5dbc33a0-96c2-4d11-9f9c-82cfc9c41ebd', 'Trimestral'),
                ('c98afbc3-3e17-4b6e-bac8-eedce0d06989', 'Anual');
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
