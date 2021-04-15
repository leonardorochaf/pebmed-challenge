import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

import { Gender } from '../utils/gender-enum'

@Entity('patients')
export class Patient {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  phone: string

  @Column()
  email: string

  @Column({ type: 'date' })
  birthday: Date

  @Column({ type: 'enum', enum: Gender })
  gender: Gender

  @Column()
  height: number

  @Column()
  weight: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date
}
