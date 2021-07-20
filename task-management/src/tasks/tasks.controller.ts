import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService : TasksService) {}

    // @Get()
    // getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    //     if(Object.keys(filterDto).length){
    //         return this.tasksService.getTaskWithFilters(filterDto);

    //     }
    //     else{
    //         return this.tasksService.getAllTasks();
    //     }

    // }

    @Get('/:id')
     getTask(@Param('id') taskId: string): Promise<Task>
    {
        return this.tasksService.getTaskById(taskId);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) : Promise<Task>
    {
        return this.tasksService.createTask(createTaskDto);
    }

    // @Delete(':id')
    // deleteTask(@Param('id') taskId: string): void 
    // {
    //     return this.tasksService.deleteTask(taskId)
    // }

    // @Patch(':id/status')
    // updateTask(@Param('id') taskId: string, @Body() updateTaskDto: UpdateTaskDto){
    //     const { status } = updateTaskDto;
    //     return this.tasksService.updateTask(taskId, status)
    // }



}
