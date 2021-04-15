import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createPatientsTable1616204050337 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'patients',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
          generationStrategy: 'uuid'
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'phone',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'birthday',
          type: 'date',
          isNullable: true
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
          isNullable: true
        },
        {
          name: 'gender',
          type: 'enum',
          enum: ['Masculino', 'Feminino', 'Prefiro não informar'],
          isNullable: true
        },
        {
          name: 'height',
          type: 'float',
          isNullable: true
        },
        {
          name: 'weight',
          type: 'float',
          isNullable: true
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'deleted_at',
          type: 'timestamp',
          isNullable: true,
          default: 'null'
        }
      ]
    }), true)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('patients')
  }
}
