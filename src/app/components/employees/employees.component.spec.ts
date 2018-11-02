import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';

import { EmployeesComponent } from './employees.component';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { MaterialModules } from 'src/app/material-layout/material-modules.module';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfirmDialogComponent, 
        EmployeesComponent
      ],
      imports: [
        FormsModule,
        MaterialModules
      ],
      providers: [
        MatDialog,
        EmployeeService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should open edit window for employee modification', inject([MatDialog], (matDialog: MatDialog) => {
    // Arrange
    const employee = <Employee>{
      id: 1
    }
    spyOn(matDialog, 'open').and.returnValue(<MatDialogRef<ConfirmDialogComponent>>{
      afterClosed(): Observable<any> {
        return of();
      }
    });

    // Act
    component.clickEditEmployee(employee);

    // Assert
    expect(matDialog.open).toHaveBeenCalled();
  }));

  it('should prompt employee for deletion', inject([MatDialog], (matDialog: MatDialog) => {
    // Arrange
    const employee = <Employee>{
      id: 1
    }
    spyOn(matDialog, 'open').and.returnValue(<MatDialogRef<ConfirmDialogComponent>>{
      afterClosed(): Observable<any> {
        return of();
      }
    });

    // Act
    component.clickDeleteEmployee(employee);

    // Assert
    expect(matDialog.open).toHaveBeenCalled();
  }));

  it('should update display data when employee is deleted', inject([EmployeeService], (employeeService: EmployeeService) => {
    // Arrange
    const employees = [
      <Employee>{
        id: 1
      },
      <Employee>{
        id: 2
      }
    ];
    component.rowData.data = [
      {
        employeeData: employees[0],
        isHovered: false
      },
      {
        employeeData: employees[1],
        isHovered: false
      }
    ];

    // Act
    component.deleteEmployee(employees[0]);
    
    // Assert
    expect(component.rowData.data.length).toBe(1);
    expect(component.rowData.data[0].employeeData.id).toBe(2);
  }));
});
