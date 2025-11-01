import {
  Controller,
  Get,
  Post,
  UseGuards,
  Query,
  Body,
  Param
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from './dto/pagination.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@ApiTags('tasks')
@ApiBearerAuth('access-token')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(@Query() query: PaginationQueryDto) {
    const { page, limit } = query;
    return this.taskService.findAll(page, limit);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getById(@Param('id') id: number): Promise<Task> {
    return this.taskService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(
      createTaskDto.title,
      createTaskDto.description,
      createTaskDto.state,
    );
  }
}
