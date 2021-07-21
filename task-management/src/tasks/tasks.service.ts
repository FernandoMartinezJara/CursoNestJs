import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TasksRepository)
        private taskRepository: TasksRepository
    ){}

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
       return this.taskRepository.getTasks(filterDto);
    }

    async getTaskById(id: string): Promise<Task>{

        const found = await this.taskRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Task with id "${ id }" not found`);
        }

        return found;

    }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {

        return this.taskRepository.createTask(createTaskDto);
    }

    async deleteTask(taskId: string) : Promise<void> {
       
        const result = await this.taskRepository.delete(taskId);

        if(result.affected === 0){
          throw new NotFoundException(`Task with Id "${ taskId }" not found`);
        }
    }

    async updateTask(taskId: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(taskId);
        task.status = status;

        await this.taskRepository.save(task);

        return task;
    }

}
