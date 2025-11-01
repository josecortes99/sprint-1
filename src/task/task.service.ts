import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(
    page = 1,
    limit = 10,
  ): Promise<{
    data: Task[];
    total: number;
    page: number;
    lastPage: number;
  }> {
    const [data, total] = await this.taskRepository.findAndCount({
      skip: (page - 1) * limit, // cuántos registros saltar
      take: limit, // cuántos registros traer
      order: { id: 'ASC' }, // opcional: ordenar por id
    });

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }
}
