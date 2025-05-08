import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    Query,
    Put,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { TasksService } from './tasks.service';
  import { CreateTaskDto } from './dtos/create-task.dto';
  import { UpdateTaskDto } from './dtos/update-task.dto';
  import { FilterTaskDto } from './dtos/filter-task.dto';
  import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
  
  @ApiTags('Tasks')
  @Controller('tasks')
  export class TasksController {
    constructor(private readonly tasksService: TasksService) {}
  
    @Post('create-task')
    @ApiOperation({ summary: 'Create a new task' })
    @ApiResponse({ status: 201, description: 'Task created successfully' })
    createTask(@Body() createTaskDto: CreateTaskDto) {
      return this.tasksService.createTask(createTaskDto);
    }
  
    @Get('get-all-tasks')
    @ApiOperation({ summary: 'Get all tasks with optional filters and pagination' })
    getTasks(@Query() filterDto: FilterTaskDto) {
      return this.tasksService.getTasks(filterDto);
    }
  
    @Get('get-task/:id')
    @ApiOperation({ summary: 'Get task by ID' })
    @ApiParam({ name: 'id', description: 'Task ID' })
    getTaskById(@Param('id') id: string) {
      return this.tasksService.getTaskById(id);
    }
  
    @Put('update-task/:id')
    @ApiOperation({ summary: 'Update a task by ID' })
    @ApiParam({ name: 'id', description: 'Task ID' })
    updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
      return this.tasksService.updateTask(id, updateTaskDto);
    }
  
    @Delete('delete-task/:id')
    @ApiOperation({ summary: 'Delete a task by ID' })
    @ApiParam({ name: 'id', description: 'Task ID' })
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteTask(@Param('id') id: string) {
      return this.tasksService.deleteTask(id);
    }
  }
  