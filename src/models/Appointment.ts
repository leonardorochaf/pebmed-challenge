import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { Schedule } from './Schedule'

@Entity('appointments')
export class Appointment {
  @PrimaryColumn()
  id: string

  @Column()
  observation: string

  @CreateDateColumn()
  createdAt: Date

  @OneToOne(() => Schedule, { eager: true })
  @JoinColumn({ name: 'schedule_id' })
  schedule: Schedule
}
