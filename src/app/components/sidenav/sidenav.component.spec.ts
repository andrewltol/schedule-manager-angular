import { APP_BASE_HREF } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { SidenavComponent } from './sidenav.component';

import { SchedulerComponent } from 'src/app/components/scheduler/scheduler.component';
import { TasksComponent } from 'src/app/components/tasks/tasks.component';
import { EmployeesComponent } from 'src/app/components/employees/employees.component';
import { MaterialLayoutComponent } from 'src/app/material-layout/material-layout.component';
import { MaterialModules } from 'src/app/material-layout/material-modules.module';
import { MaterialLayoutRoutes } from 'src/app/material-layout/material-layout.routing';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MaterialLayoutComponent,
        SchedulerComponent,
        SidenavComponent,
        TasksComponent,
        EmployeesComponent
      ],
      imports: [
        MaterialModules,
        RouterModule.forRoot(MaterialLayoutRoutes)
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
