import { DatePipe } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { User } from 'src/app/models/user';
import { DateService, DISPLAY_DATE_FORMAT } from 'src/app/services/date.service';

export interface EditUserComponentData {
  editUser: User
}

export interface EditUserResultData {
  editedUser: User,
  shouldSave: boolean
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  addingUser: boolean;
  user: User;

  @ViewChild('startDateInput') startDateInput: ElementRef<HTMLInputElement>;
  @ViewChild('termDateInput') termDateInput: ElementRef<HTMLInputElement>;

  constructor(public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditUserComponentData,
    private datePipe: DatePipe,
    private dateService: DateService) {
    if (data.editUser) {
      this.user = data.editUser;
      this.addingUser = false;
    }
    else {
      this.user = new User();
      this.addingUser = true;
    }
  }

  createResultData(shouldSave: boolean): EditUserResultData {
    return {
      editedUser: this.user,
      shouldSave
    }
  }

  getTitle(): string {
    return this.addingUser ? "Add User" : "Edit User";
  }

  getUserStartDate(): string {
    return this.datePipe.transform(this.user.startDate, DISPLAY_DATE_FORMAT);
  }

  getUserTerminationDate(): string {
    if (this.user.terminationDate) {
      return this.datePipe.transform(this.user.terminationDate, DISPLAY_DATE_FORMAT);
    }
  }

  onCancel() {
    this.dialogRef.close(this.createResultData(false));
  }

  onConfirm() {
    this.user.startDate = this.dateService.parseDateFromHTMLValue(this.startDateInput.nativeElement.value);

    if (this.termDateInput.nativeElement.value) {
      this.user.terminationDate = this.dateService.parseDateFromHTMLValue(this.termDateInput.nativeElement.value);
    }

    this.dialogRef.close(this.createResultData(true));
  }
}
