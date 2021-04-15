import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity('doctors')
export class Doctor {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
