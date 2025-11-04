import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InstitutuionHasRegime1760171824752 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.createTable(
              new Table({
                name: 'institution_has_regimes',
                columns: [
                  {
                    name: 'institution_id',
                    type: 'uuid',
                    isNullable: false,
                    isPrimary: true,
                  },
                   {
                    name: 'regime_id',
                    type: 'uuid',
                    isNullable: false,
                    isPrimary: true,
                  },
                ],
                foreignKeys: [
                  {
                    columnNames: ['regime_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'regimes',
                    onDelete: 'CASCADE',
                  },
                  {
                    columnNames: ['institution_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'institutions',
                    onDelete: 'CASCADE',
                  },
                ],
              }),
              true,
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
