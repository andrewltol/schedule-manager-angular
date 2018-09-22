import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MaterialLayoutComponent } from './material-layout.component';

import { SchedulerComponent } from 'src/app/components/scheduler/scheduler.component';
import { TasksComponent } from 'src/app/components/tasks/tasks.component';
import { UsersComponent } from 'src/app/components/users/users.component';

export const MaterialLayoutRoutes: Routes = [
  {
    path: '',
    component: MaterialLayoutComponent,
    children: [
      {
        path: 'scheduler',
        component: SchedulerComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'tasks',
        component: TasksComponent
      }
    ]
  }
];