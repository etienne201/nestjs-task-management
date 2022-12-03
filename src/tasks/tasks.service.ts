import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTasksWithFilers(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    // define a temporary array to hold the result
    let tasks = this.getAllTasks();
    // Do something with status
    if (status) {
      tasks = tasks.filter((tasks) => tasks.status === status);
    }
    // Do something with
    if (search) {
      tasks = tasks.filter((tasks) => {
        if (
          tasks.title.includes(search) ||
          tasks.description.includes(search)
        ) {
          return true;
        }
        return false;
      });
    }
    // return final result
    return tasks;
  }
  getTasById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTasById(id);
    task.status = status;
    return task;
  }
}
