import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class PermissionItens1759829979057 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'permission_items',
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
            name: 'permission_id',
            type: 'uuid',
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
      `INSERT INTO permission_items (id, key, name, permission_id) VALUES
                  (uuid_generate_v4(), 'create_students', 'Criar estudante', '888ad632-20b8-45b3-8bbf-d8780bc3b0df'),
                  (uuid_generate_v4(), 'edit_students', 'Editar estudante', '888ad632-20b8-45b3-8bbf-d8780bc3b0df'),
                  (uuid_generate_v4(), 'create_enrollment', 'Criar matricula', '888ad632-20b8-45b3-8bbf-d8780bc3b0df'),
                  (uuid_generate_v4(), 'create_enrollment', 'Criar inscrição', '888ad632-20b8-45b3-8bbf-d8780bc3b0df'),
                  (uuid_generate_v4(), 'create_paymment_type_student', 'Criar tipo de pagemnto', '888ad632-20b8-45b3-8bbf-d8780bc3b0df'),
                  (uuid_generate_v4(), 'view_students', 'Visualizar estudantes', '888ad632-20b8-45b3-8bbf-d8780bc3b0df'),
                  
                  (uuid_generate_v4(), 'create_employees', 'Criar funcionario', '8c563651-717e-47bf-a31b-06da0df8610f'),
                  (uuid_generate_v4(), 'editar_employees', 'Editar funcionario', '8c563651-717e-47bf-a31b-06da0df8610f'),
                  (uuid_generate_v4(), 'view_employees', 'Visualizar funcionario', '8c563651-717e-47bf-a31b-06da0df8610f'),

                  (uuid_generate_v4(), 'edit_institution', 'Editar instituição', '1c8c35ce-a7ed-40fa-a878-f747fe0e663f'),
                  (uuid_generate_v4(), 'list_grade', 'Listar classe', '1c8c35ce-a7ed-40fa-a878-f747fe0e663f'),
                  (uuid_generate_v4(), 'create_grade', 'Criar classe', '1c8c35ce-a7ed-40fa-a878-f747fe0e663f'),
                  (uuid_generate_v4(), 'edit_grade', 'Editar classe', '1c8c35ce-a7ed-40fa-a878-f747fe0e663f'),
                  (uuid_generate_v4(), 'delete_grade', 'Deletar classe', '1c8c35ce-a7ed-40fa-a878-f747fe0e663f'),

                  (uuid_generate_v4(), 'list_course', 'Listar course', '1c8c35ce-a7ed-40fa-a878-f747fe0e663f'),
                  (uuid_generate_v4(), 'create_course', 'Criar course', '1c8c35ce-a7ed-40fa-a878-f747fe0e663f'),
                  (uuid_generate_v4(), 'edit_course', 'Editar course', '1c8c35ce-a7ed-40fa-a878-f747fe0e663f'),
                  (uuid_generate_v4(), 'delete_course', 'Deletar course', '1c8c35ce-a7ed-40fa-a878-f747fe0e663f'),

                  (uuid_generate_v4(), 'list_level', 'Listar nivel', '1c8c35ce-a7ed-40fa-a878-f747fe0e663f'),
                  (uuid_generate_v4(), 'create_level', 'Criar nivel', '1c8c35ce-a7ed-40fa-a878-f747fe0e663f'),
                  (uuid_generate_v4(), 'edit_level', 'Editar nivel', '1c8c35ce-a7ed-40fa-a878-f747fe0e663f'),
                  (uuid_generate_v4(), 'delete_level', 'Deletar nivel', '1c8c35ce-a7ed-40fa-a878-f747fe0e663f')
                  `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
