import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';

import { TasksComponent } from './tasks.component';

import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { MaterialModules } from 'src/app/material-layout/material-modules.module';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfirmDialogComponent,
        TasksComponent
      ],
      imports: [
        FormsModule,
        MaterialModules
      ],
      providers: [
        MatDialog,
        TaskService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should prompt for confirmation on delete', inject([MatDialog], (matDialog: MatDialog) => {
    // Arrange
    const task = <Task>{
      id: 1
    }
    spyOn(matDialog, 'open').and.returnValue(<MatDialogRef<ConfirmDialogComponent>>{
      afterClosed(): Observable<any> {
        return of();
      }
    });

    // Act
    component.clickDeleteTask(task);

    // Assert
    expect(matDialog.open).toHaveBeenCalled();
  }));

  it('should update display data when deleting tasks', () => {
    // Arrange
    const tasks = <Task[]>[
      {
        id: 1
      },
      {
        id: 2
      }
    ];
    component.rowData.data = tasks.map(t => {
      return {
        isHovered: false,
        taskData: t
      }
    });

    // Act
    component.deleteTask(tasks[0]);

    // Assert
    expect(component.rowData.data.length).toBe(1);
    expect(component.rowData.data[0].taskData.id).toBe(2);
  });
});
