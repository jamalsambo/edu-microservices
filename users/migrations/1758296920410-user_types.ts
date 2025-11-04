import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserTypes1758296920410 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_types',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()', // Correção aqui, aspas simples e sem função
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()', // Correto para gerar data automaticamente
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()', // Correto para gerar data automaticamente
          },
          // eslint-disable-next-line prettier/prettier
        ],
      }),
      true,
    );
  }

  public async down(): Promise<void> {}
}
