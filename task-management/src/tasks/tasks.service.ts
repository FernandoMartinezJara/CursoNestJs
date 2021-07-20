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
    

    // getAllTasks(): Task[]{
    //     return this.tasks;
    // }

    // getTaskWithFilters(filterDto: GetTasksFilterDto): Task[]
    // {
    //     const { status, search } = filterDto;

    //     let tasks = this.getAllTasks();

    //     if(status){

    //         tasks = tasks.filter(x => x.status === status);
    //     }
    //     if(search){
    //         tasks = tasks.filter(x => {
    //             if(x.title.includes(search) || x.description.includes(search)){
    //                 return true;
    //             }else{
    //                 return false;
    //             }
    //         })

    //     }

    //     return tasks;

    // }


    async getTaskById(id: string): Promise<Task>{

        const found = await this.taskRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Task with id "${ id }" not found`);
        }

        return found;

    }

    // getTaskById(taskId: string): Task{

    //     const found =  this.tasks.find(x => x.id === taskId);

    //     if(!found){
    //         throw new NotFoundException();
    //     }

    //     return found;
    // }


    createTask(createTaskDto: CreateTaskDto): Promise<Task> {

        return this.taskRepository.createTask(createTaskDto);
    }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto;
        
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     };

    //     this.tasks.push(task);

    //     return task;
    // }

    // deleteTask(taskId: string): void {
        
    //     const task = this.getTaskById(taskId);
    //     this.tasks = this.tasks.filter(x => x.id !== task.id);
    // }

    // updateTask(taskId: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(taskId);
    //     task.status = status;
    //     return task;
    // }

}
