import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createSessionsTable1616768364605 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'sessions',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
          generationStrategy: 'uuid'
        },
        {
          name: 'token',
          type: 'varchar'
        },
        {
          name: 'login_at',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'logout_at',
          type: 'timestamp',
          isNullable: true,
          default: 'null'
        },
        {
          name: 'doctor_id',
          type: 'varchar'
        }
      ]
    }), true)

    await queryRunner.createForeignKey('sessions',
      new TableForeignKey({
        columnNames: ['doctor_id'],
        referencedTableName: 'doctors',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sessions')
  }
}
