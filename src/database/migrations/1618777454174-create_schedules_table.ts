import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createSchedulesTable1616972120930 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'schedules',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
          generationStrategy: 'uuid'
        },
        {
          name: 'time',
          type: 'timestamp'
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
          name: 'patient_id',
          type: 'varchar'
        },
        {
          name: 'doctor_id',
          type: 'varchar'
        }
      ]
    }), true)

    await queryRunner.createForeignKey('schedules',
      new TableForeignKey({
        columnNames: ['patient_id'],
        referencedTableName: 'patients',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      })
    )

    await queryRunner.createForeignKey('schedules',
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
    await queryRunner.dropTable('schedules')
  }
}
