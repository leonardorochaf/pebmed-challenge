import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createAppointmentsTable1618440327536 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'appointments',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
          generationStrategy: 'uuid'
        },
        {
          name: 'observation',
          type: 'varchar'
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'schedule_id',
          type: 'varchar'
        }
      ]
    }), true)

    await queryRunner.createForeignKey('appointments',
      new TableForeignKey({
        columnNames: ['schedule_id'],
        referencedTableName: 'schedules',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments')
  }
}
