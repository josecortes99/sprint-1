import {
  Controller,
  Get,
  UseGuards,
  Query
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from './dto/pagination.dto';

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
}
