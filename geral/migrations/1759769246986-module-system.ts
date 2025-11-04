import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ModuleSystem1759769246986 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'module_systems',
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
      INSERT INTO module_systems (id, name)
      VALUES 
        ('7a0b9c15-3d01-451d-b56b-f3e5a3743d62', 'Academico'),
        ('7a0b9c15-3d01-451d-b56b-f3e5a3743d63', 'Financeiro'),
        ('7a0b9c15-3d01-451d-b56b-f3e5a3743d64', 'Estoque'),
        ('7a0b9c15-3d01-451d-b56b-f3e5a3743d65', 'Patrimonio'),
        ('7a0b9c15-3d01-451d-b56b-f3e5a3743d66', 'Notificaçôes web'),
        ('7a0b9c15-3d01-451d-b56b-f3e5a3743d67', 'Notificaçôes mobile');
    `);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
