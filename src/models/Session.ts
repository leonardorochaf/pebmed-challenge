import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

import { Doctor } from './Doctor'

@Entity('sessions')
export class Session {
  @PrimaryColumn()
  id: string

  @Column()
  token: string

  @CreateDateColumn({ name: 'login_at' })
  loginAt: Date

  @DeleteDateColumn({ name: 'logout_at' })
  logoutAt: Date

  @ManyToOne(() => Doctor, { onDelete: 'RESTRICT', onUpdate: 'CASCADE', eager: true })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor
}
