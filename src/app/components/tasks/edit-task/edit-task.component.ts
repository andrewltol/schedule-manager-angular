import { DatePipe } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Task } from 'src/app/models/task';
import { DateService, DISPLAY_DATE_FORMAT } from 'src/app/services/date.service';

export interface EditTaskData {
  editTask: Task;
  shouldSave: boolean;
}

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent {
  addingTask: boolean;
  task: Task;

  @ViewChild('startDateInput') startDateInput: ElementRef<HTMLInputElement>;
  @ViewChild('termDateInput') termDateInput: ElementRef<HTMLInputElement>;

  constructor(public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditTaskData,
    private datePipe: DatePipe,
    private dateService: DateService) {
    if (data.editTask) {
      this.task = data.editTask;
      this.addingTask = false;
    }
    else {
      this.task = new Task();
      this.addingTask = true;
    }
  }

  createResultData(shouldSave: boolean): EditTaskData {
    return {
      editTask: this.task,
      shouldSave
    }
  }

  getTaskStartDate(): string {
    return this.datePipe.transform(this.task.startDate, DISPLAY_DATE_FORMAT);
  }

  getTaskTerminationDate(): string {
    if (this.task.terminationDate) {
      return this.datePipe.transform(this.task.terminationDate, DISPLAY_DATE_FORMAT);
    }
  }

  getTitle(): string {
    return this.addingTask ? "Add Task" : "Edit Task";
  }

  onCancel() {
    this.dialogRef.close(this.createResultData(false));
  }

  onConfirm() {
    this.task.startDate = this.dateService.parseDateFromHTMLValue(this.startDateInput.nativeElement.value);

    if (this.termDateInput.nativeElement.value) {
      this.task.terminationDate = this.dateService.parseDateFromHTMLValue(this.termDateInput.nativeElement.value);
    }

    this.dialogRef.close(this.createResultData(true));
  }
}
