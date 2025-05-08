import { IsEnum, IsOptional, IsPositive } from 'class-validator';
import { TaskStatus } from '../enums/status.enum';
import { TaskPriority } from '../enums/priority.enum';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterTaskDto {
  @ApiPropertyOptional({
    enum: TaskStatus,
    description: 'Filter by task status',
    example: TaskStatus.DONE,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({
    enum: TaskPriority,
    description: 'Filter by task priority',
    example: TaskPriority.RED,
  })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  page?: number;

  @ApiPropertyOptional({
    description: 'Limit of items per page',
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  limit?: number;
}
