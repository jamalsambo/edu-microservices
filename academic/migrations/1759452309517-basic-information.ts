import { BasicInformationGenderEnum } from 'src/basic-information/enum/basic-information-gender.enum';
import { BasicInformationMaritalStatusEnum } from 'src/basic-information/enum/basic-information-marita-status.enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class BasicInformation1759452309517 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'basic_information',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'full_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'date_of_birth',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'gender',
            type: 'enum',
            isNullable: false,
            enum: Object.values(BasicInformationGenderEnum),
          },
          {
            name: 'marital_status',
            type: 'enum',
            isNullable: false,
            enum: Object.values(BasicInformationMaritalStatusEnum),
          },
          {
            name: 'country_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'natural_country',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'natural_province',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'district_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'neighborhood',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'house_number',
            type: 'varchar',
            isNullable: true,
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
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
