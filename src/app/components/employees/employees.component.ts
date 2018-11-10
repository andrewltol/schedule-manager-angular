import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { EditEmployeeComponent, EditEmployeeComponentData, EditEmployeeResultData } from './edit-employee/edit-employee.component';

import { ConfirmDialogComponent, ConfirmDialogData } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

interface EmployeeRowData {
  isHovered: boolean;
  employeeData: Employee;
};

@Component({
  selector: 'employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  
  rowData = new MatTableDataSource<EmployeeRowData>();
  selectedRow: EmployeeRowData;
  employeeColumns: string[] = [ 'name', 'active', 'edit', 'delete' ];

  constructor(
    private matDialog: MatDialog,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  clickAddEmployee() {
    const dialog = this.matDialog.open(EditEmployeeComponent, {
      data: {},
      width: '800px'      
    });

    dialog.afterClosed().subscribe((result: EditEmployeeResultData) => {
      if (result.didSave) {
        this.getEmployees();
      }
    });
  }

  clickDeleteEmployee(employee: Employee) {
    this.matDialog.open(ConfirmDialogComponent, {
      data: <ConfirmDialogData>{
        confirmAction: () => {
          this.employeeService.deleteEmployee(employee.id).subscribe(() => {
            this.getEmployees();
          });
        },
        confirmText: 'Delete',
        prompt: `Are you sure you want to delete employee ${employee.fullName}?`,
        rejectText: 'Cancel',
        title: 'Delete Employee'
      },
      width: '250px'
    });
  }

  clickEditEmployee(employee: Employee) {
    const dialog = this.matDialog.open(EditEmployeeComponent, {
      data: <EditEmployeeComponentData>{
        editEmployee: employee   // send copy so we can control save/cancel
      },
      width: '800px'      
    });

    dialog.afterClosed().subscribe((result: EditEmployeeResultData) => {
      if (result.didSave) {
        // Update edited employee.
        this.getEmployees();
      }
    });
  }

  deleteEmployee(employee: Employee) {
    this.employeeService.deleteEmployee(employee.id);

    // Handle updating current employee screen
    const currentData = this.rowData.data;
    const deleteRow = currentData.findIndex(row => row.employeeData.id === employee.id);
    currentData.splice(deleteRow, 1);
    this.rowData.data = currentData;
  }

  getEmployees() {
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.rowData.data = employees.map(u => {
        const employee = new Employee();
        employee.loadProperties(u); 
        return <EmployeeRowData>{
          isHovered: false,
          employeeData: employee
        };
      });
    });
  }

  onMouseEnter(row: EmployeeRowData) {
    row.isHovered = true;
  }

  onMouseLeave(row: EmployeeRowData) {
    row.isHovered = false;
  }

  showEditButtons(row: EmployeeRowData): boolean {
    return (row === this.selectedRow) || row.isHovered;
  }

  selectRow(row: EmployeeRowData) {
    this.selectedRow = row;
  }
}
