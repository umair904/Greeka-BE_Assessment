import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../db/entities/task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { FilterTaskDto } from './dtos/filter-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const task = this.taskRepo.create(createTaskDto);
      return await this.taskRepo.save(task);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create task');
    }
  }

  async getTasks(filterDto: FilterTaskDto): Promise<Task[]> {
    const { status, priority, page = 1, limit = 10 } = filterDto;
    try {
      const query = this.taskRepo.createQueryBuilder('task');
      if (status) {
        query.andWhere('task.status = :status', { status });
      }
      if (priority) {
        query.andWhere('task.priority = :priority', { priority });
      }
      query.skip((page - 1) * limit).take(limit);
      return await query.getMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch filtered tasks');
    }
  }

  async getTaskById(id: string): Promise<Task> {
    try {
      const task = await this.taskRepo.findOne({ where: { id } });
      if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
      return task;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch task');
    }
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      const task = await this.getTaskById(id); // will throw if not found
      const updated = Object.assign(task, updateTaskDto);
      return await this.taskRepo.save(updated);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to update task');
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      const result = await this.taskRepo.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to delete task');
    }
  }
}
