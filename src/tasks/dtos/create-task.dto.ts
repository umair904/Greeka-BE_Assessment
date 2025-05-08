import { IsEnum, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';
import { TaskStatus } from '../enums/status.enum';
import { TaskPriority } from '../enums/priority.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Buy groceries',
    description: 'Name of the task',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '2025-05-10',
    description: 'Due date of the task in YYYY-MM-DD format',
  })
  @IsDateString()
  dueDate: string;

  @ApiProperty({
    enum: TaskStatus,
    description: 'Current status of the task',
    default: TaskStatus.PENDING,
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty({
    enum: TaskPriority,
    description: 'Priority level of the task',
    default: TaskPriority.BLUE,
  })
  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @ApiPropertyOptional({
    description: 'Whether the task is active',
    default: true,
  })
  @IsOptional()
  isActive?: boolean;
}
