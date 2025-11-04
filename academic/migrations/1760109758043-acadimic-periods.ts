import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AcadimicPeriods1760109758043 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'periods',
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
            name: 'regime_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['regime_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'regimes',
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );

    await queryRunner.query(`
              INSERT INTO periods (id, name, regime_id)
              VALUES 
                ('82db4edd-1abc-4642-a5e3-c72bf0416240', '1º Semestre', '82db4edd-1abc-4642-a5e3-c72bf041624f'),
                ('82db4edd-1abc-4642-a5e3-c72bf0416241', '2º Semestre', '82db4edd-1abc-4642-a5e3-c72bf041624f'),
                ('82db4edd-1abc-4642-a5e3-c72bf0416242', '1º Trimestre', '5dbc33a0-96c2-4d11-9f9c-82cfc9c41ebd'),
                ('82db4edd-1abc-4642-a5e3-c72bf0416243', '2º Trimestre', '5dbc33a0-96c2-4d11-9f9c-82cfc9c41ebd'),
                ('82db4edd-1abc-4642-a5e3-c72bf0416244', '3º Trimestre', '5dbc33a0-96c2-4d11-9f9c-82cfc9c41ebd'),
                ('82db4edd-1abc-4642-a5e3-c72bf0416245', 'Unico', 'c98afbc3-3e17-4b6e-bac8-eedce0d06989');
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
