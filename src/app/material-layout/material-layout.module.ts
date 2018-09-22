import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialLayoutComponent } from './material-layout.component';
import { MaterialModules } from './material-modules.module';

import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { SchedulerComponent } from 'src/app/components/scheduler/scheduler.component';
import { SidenavComponent } from 'src/app/components/sidenav/sidenav.component';
import { TasksComponent } from 'src/app/components/tasks/tasks.component';
import { EditUserComponent } from 'src/app/components/users/edit-user/edit-user.component';
import { UsersComponent } from 'src/app/components/users/users.component';

import { DateService } from 'src/app/services/date.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    EditUserComponent,
    MaterialLayoutComponent,
    SchedulerComponent,
    SidenavComponent,
    TasksComponent,
    UsersComponent
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
    TaskService,
    UserService
  ],
  entryComponents: [
    ConfirmDialogComponent,
    EditUserComponent
  ]
})

export class MaterialLayoutModule {}