import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTypesSeed1758297179092 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO user_types (id, name)
        VALUES
        ('9a9d09f6-8a03-4f83-8bca-e2194bd865a9', 'Estudante'),
        ('75287d9e-ed40-47b0-87bd-f655c8e09f3e', 'Funcionario'),
        ('3d030396-e770-44fb-a388-90e91e8f5ce2', 'Encarregado'),
        ('e24be55e-1e2e-4b0f-80d6-c2bf5d45a316', 'Visitante')
      `);
  }

  public async down(): Promise<void> {}
}
