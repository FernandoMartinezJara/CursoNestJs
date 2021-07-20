import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { filter } from 'rxjs';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks;
    }

    getTaskWithFilters(filterDto: GetTasksFilterDto): Task[]
    {
        const { status, search } = filterDto;

        let tasks = this.getAllTasks();

        if(status){

            tasks = tasks.filter(x => x.status === status);
        }
        if(search){
            tasks = tasks.filter(x => {
                if(x.title.includes(search) || x.description.includes(search)){
                    return true;
                }else{
                    return false;
                }
            })

        }

        return tasks;

    }

    getTaskById(taskId: string): Task{
        return this.tasks.find(x => x.id === taskId);
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);

        return task;
    }

    deleteTask(taskId: string): void {
        
        const task = this.getTaskById(taskId);

        if(task){
            this.tasks = this.tasks.filter(x => x.id !== taskId);
        }

    }

    updateTask(taskId: string, status: TaskStatus): Task {
        const task = this.getTaskById(taskId);
        task.status = status;
        return task;
    }

}
