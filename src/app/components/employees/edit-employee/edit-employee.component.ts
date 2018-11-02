import { DatePipe } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Employee } from 'src/app/models/employee';
import { DateService, DISPLAY_DATE_FORMAT } from 'src/app/services/date.service';

export interface EditEmployeeComponentData {
  editEmployee: Employee
}

export interface EditEmployeeResultData {
  editedEmployee: Employee,
  shouldSave: boolean
}

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent {
  addingEmployee: boolean;
  employee: Employee;

  @ViewChild('startDateInput') startDateInput: ElementRef<HTMLInputElement>;
  @ViewChild('termDateInput') termDateInput: ElementRef<HTMLInputElement>;

  constructor(public dialogRef: MatDialogRef<EditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditEmployeeComponentData,
    private datePipe: DatePipe,
    private dateService: DateService) {
    if (data.editEmployee) {
      this.employee = data.editEmployee;
      this.addingEmployee = false;
    }
    else {
      this.employee = new Employee();
      this.addingEmployee = true;
    }
  }

  createResultData(shouldSave: boolean): EditEmployeeResultData {
    return {
      editedEmployee: this.employee,
      shouldSave
    }
  }

  getTitle(): string {
    return this.addingEmployee ? "Add Employee" : "Edit Employee";
  }

  getEmployeeStartDate(): string {
    return this.datePipe.transform(this.employee.hireDate, DISPLAY_DATE_FORMAT);
  }

  getEmployeeTerminationDate(): string {
    if (this.employee.terminationDate) {
      return this.datePipe.transform(this.employee.terminationDate, DISPLAY_DATE_FORMAT);
    }
  }

  onCancel() {
    this.dialogRef.close(this.createResultData(false));
  }

  onConfirm() {
    this.employee.hireDate = this.dateService.parseDateFromHTMLValue(this.startDateInput.nativeElement.value);

    if (this.termDateInput.nativeElement.value) {
      this.employee.terminationDate = this.dateService.parseDateFromHTMLValue(this.termDateInput.nativeElement.value);
    }

    this.dialogRef.close(this.createResultData(true));
  }
}
