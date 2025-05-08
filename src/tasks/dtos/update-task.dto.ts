import { IsOptional, IsEnum, IsString, IsDateString } from 'class-validator';
import { TaskStatus } from '../enums/status.enum';
import { TaskPriority } from '../enums/priority.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    description: 'Updated task name/details',
    example: 'Finish the final report',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    enum: TaskStatus,
    description: 'Updated task status',
    example: TaskStatus.IN_PROGRESS,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({
    example: '2025-05-10',
    description: 'Due date of the task in YYYY-MM-DD format',
  })
  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @ApiPropertyOptional({
    enum: TaskPriority,
    description: 'Updated task priority',
    example: TaskPriority.RED,
  })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @ApiPropertyOptional({
    description: 'Whether the task is active',
    example: true,
  })
  @IsOptional()
  isActive?: boolean;
}
