import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { TaskStatus } from '../../tasks/enums/status.enum';
import { TaskPriority } from '../../tasks/enums/priority.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;

  @Column({ type: 'enum', enum: TaskPriority, default: TaskPriority.BLUE })
  priority: TaskPriority;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: true })
  isActive: boolean;
}
