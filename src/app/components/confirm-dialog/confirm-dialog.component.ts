import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmDialogData {
  confirmAction: () => void;
  confirmText: string;
  prompt: string;
  rejectAction: () => void;
  rejectText: string;
  title: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) { }

    onConfirm() {
      if (this.data.confirmAction) {
        this.data.confirmAction();
      }

      this.dialogRef.close();
    }

    onReject() {
      if (this.data.rejectAction) {
        this.data.rejectAction();
      }

      this.dialogRef.close();
    }
}
