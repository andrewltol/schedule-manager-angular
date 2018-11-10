import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialLayoutComponent } from './material-layout.component';
import { MaterialModules } from './material-modules.module';

import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { SchedulerComponent } from 'src/app/components/scheduler/scheduler.component';
import { SidenavComponent } from 'src/app/components/sidenav/sidenav.component';
import { EditTaskComponent } from 'src/app/components/tasks/edit-task/edit-task.component';
import { TasksComponent } from 'src/app/components/tasks/tasks.component';
import { EditEmployeeComponent } from 'src/app/components/employees/edit-employee/edit-employee.component';
import { EmployeesComponent } from 'src/app/components/employees/employees.component';

import { DateService } from 'src/app/services/date.service';
import { TaskService } from 'src/app/services/task.service';
import { EmployeeService } from 'src/app/services/employee.service';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    EditTaskComponent,
    EditEmployeeComponent,
    MaterialLayoutComponent,
    SchedulerComponent,
    SidenavComponent,
    TasksComponent,
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModules,
    RouterModule
  ],
  exports: [
    CommonModule,
    MaterialLayoutComponent,
    MaterialModules
  ],
  providers: [
    DatePipe,
    DateService,
    HttpClient,
    TaskService,
    EmployeeService
  ],
  entryComponents: [
    ConfirmDialogComponent,
    EditTaskComponent,
    EditEmployeeComponent
  ]
})

export class MaterialLayoutModule {}