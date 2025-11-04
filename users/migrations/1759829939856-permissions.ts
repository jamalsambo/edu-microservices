import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Permissions1759829939856 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'permissions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: false,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'key',
            type: 'varchar',
            isNullable: false,
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
      }),
    );

    await queryRunner.query(
      `INSERT INTO permissions (id, key, name) VALUES
            ('888ad632-20b8-45b3-8bbf-d8780bc3b0df', 'manage_students', 'Estudantes'),
            ('8c563651-717e-47bf-a31b-06da0df8610f', 'manage_employees', 'Funcionários'),
            ('58577f8b-1bff-488d-be15-b8b9d8650b5a', 'manage_curriculum', 'Planos curriculares'),
            ('58577f8b-1bff-488d-be15-b8b9d8650b4b', 'manage_course', 'Cursos'),
            ('58577f8b-1bff-488d-be15-b8b9d8650b3b', 'manage_grade', 'Classes'),
            ('58577f8b-1bff-488d-be15-b8b9d8650b2b', 'manage_level', 'Niveis'),
            ('58577f8b-1bff-488d-be15-b8b9d8650b5b', 'manage_classe', 'Turmas'),
            ('58577f8b-1bff-488d-be15-b8b9d8650b5c', 'manage_discipline', 'Disciplinas'),
            ('58577f8b-1bff-488d-be15-b8b9d8650b5d', 'manage_activity', 'Actividades'),
            ('0e41f4af-d37c-4900-9bcd-a9834038358a', 'track_attendance', 'Registro de frequência de alunos'),
            ('50886fed-1df1-44a9-869e-5b0a8a8d9d4b', 'issue_reports', 'Emissão de boletins'),
            ('20082400-765c-44b1-8ffe-f94591318c00', 'reports', 'Relatórios'),
            ('4068290f-ffbd-4e05-9b87-6dc275e0eabe', 'schedule_management', 'Horários de turma'),
            ('1c8c35ce-a7ed-40fa-a878-f747fe0e663f', 'manage_institutions', 'Instituição'),
            ('6f4ebc9d-b5d5-4d44-aa5d-098fa45932ee', 'manage_finance', 'Finanças'),
            ('dc9ff61f-dde4-479d-9f18-829a1ac3e3fc', 'manage_notifications', 'Notificações'),
            ('dc9ff61f-dde4-479d-9f18-829a1ac3e3fd', 'manage_estoque', 'Estoque'),
            ('dc9ff61f-dde4-479d-9f18-829a1ac3e3ff', 'manage_patrimony', 'Patrimonio')
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
