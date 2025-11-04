import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InstitutionModules1759773371485 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'institution_modules',
        columns: [
          {
            name: 'institution_id',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'module_id',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
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
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
