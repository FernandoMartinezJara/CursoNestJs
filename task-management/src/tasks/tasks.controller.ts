import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { Logger } from '@nestjs/common';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    
    private logger = new Logger('TaskController');

    constructor(private tasksService : TasksService) {}

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto,  @GetUser() user: User): Promise<Task[]> {
        this.logger.verbose(`User "${ user.username }" retrieving all tasks. Filter: ${ JSON.stringify(filterDto)}`)
        return this.tasksService.getTasks(filterDto, user);
    }

    @Get('/:id')
     getTask(
         @Param('id') taskId: string,
         @GetUser() user: User): Promise<Task>
    {
        return this.tasksService.getTaskById(taskId, user);
    }

    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User) : Promise<Task>
    {
        this.logger.verbose(`User ${ user.username } create task ${JSON.stringify(createTaskDto)}`)
        return this.tasksService.createTask(createTaskDto, user);
    }

    @Delete(':id')
    deleteTask(@Param('id') taskId: string, user: User): Promise<void>
    {
        return this.tasksService.deleteTask(taskId, user)
    }

    @Patch(':id/status')
    updateTask(
        @Param('id') taskId: string, 
        @Body() updateTaskDto: UpdateTaskDto,
        @GetUser() user: User){
        const { status } = updateTaskDto;
        return this.tasksService.updateTask(taskId, status, user)
    }
}
