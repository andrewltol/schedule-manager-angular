import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { MaterialLayoutComponent } from './material-layout.component';
import { MaterialLayoutRoutes } from './material-layout.routing';
import { MaterialModules } from './material-modules.module';
import { SchedulerComponent } from 'src/app/components/scheduler/scheduler.component';
import { SidenavComponent } from 'src/app/components/sidenav/sidenav.component';
import { TasksComponent } from 'src/app/components/tasks/tasks.component';
import { UsersComponent } from 'src/app/components/users/users.component';

describe('MaterialLayoutComponent', () => {
  let component: MaterialLayoutComponent;
  let fixture: ComponentFixture<MaterialLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MaterialLayoutComponent,
        SchedulerComponent,
        SidenavComponent,
        TasksComponent,
        UsersComponent
      ],
      imports: [
        FormsModule,
        MaterialModules,
        NoopAnimationsModule,
        RouterModule.forRoot(MaterialLayoutRoutes)
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
