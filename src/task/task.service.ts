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

  async findById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async create(
    title: string,
    description: string,
    state: string,
  ): Promise<Task> {
    const task = this.taskRepository.create({ title, description, state });
    return await this.taskRepository.save(task);
  }

  async update(id: number, updateData: Partial<Task>): Promise<Task> {
    const task = await this.findById(id);
    Object.assign(task, updateData);
    return await this.taskRepository.save(task);
  }
}
