import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Task } from 'src/app/models/task';

@Injectable()
export class TaskService {

  private tasks: Task[];

  constructor() {
    this.createDummyTasks();
  }

  private createDummyTasks() {
    this.tasks = [];
    let task = new Task();
    task.id = 1;
    task.taskName = 'Front Desk';
    task.startDate = new Date(2010, 1, 1);
    this.tasks.push(task);

    task = new Task();
    task.id = 2;
    task.taskName = 'Front Desk Manager';
    task.startDate = new Date(2010, 1, 1);
    this.tasks.push(task);

    task = new Task();
    task.id = 3;
    task.taskName = 'Chauffeur';
    task.startDate = new Date(2010, 1, 1);
    this.tasks.push(task);
  }

  getAllTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  deleteTask(id: number) {
    const taskIndex = this.tasks.findIndex(t => t.id === id);
    this.tasks.splice(taskIndex, 1);
  }
}
