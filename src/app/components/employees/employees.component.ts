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
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.rowData.data = employees.map(u => {
        return <EmployeeRowData>{
          isHovered: false,
          employeeData: u
        };
      });
    });
  }

  clickAddEmployee() {
    const dialog = this.matDialog.open(EditEmployeeComponent, {
      data: {},
      width: '800px'      
    });

    dialog.afterClosed().subscribe((result: EditEmployeeResultData) => {
      if (result.shouldSave) {
        // Add new employee
        const currentData = this.rowData.data;
        let newRow: EmployeeRowData = <EmployeeRowData>{};
        newRow.isHovered = false;
        newRow.employeeData = result.editedEmployee;
        currentData.push(newRow);
        this.rowData.data = currentData;
      }
    });
  }

  clickDeleteEmployee(employee: Employee) {
    this.matDialog.open(ConfirmDialogComponent, {
      data: <ConfirmDialogData>{
        confirmAction: () => {
          this.deleteEmployee(employee);
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
        editEmployee: Object.create(employee)   // send copy so we can control save/cancel
      },
      width: '800px'      
    });

    dialog.afterClosed().subscribe((result: EditEmployeeResultData) => {
      if (result.shouldSave) {
        // Update edited employee.
        let updatedRow = this.rowData.data.find(data => {
          return data.employeeData.id === result.editedEmployee.id;
        });
        updatedRow.employeeData = result.editedEmployee;
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
