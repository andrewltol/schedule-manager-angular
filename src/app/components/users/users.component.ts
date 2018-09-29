import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { EditUserComponent, EditUserComponentData, EditUserResultData } from './edit-user/edit-user.component';

import { ConfirmDialogComponent, ConfirmDialogData } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

interface UserRowData {
  isHovered: boolean;
  userData: User;
};

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  
  rowData = new MatTableDataSource<UserRowData>();
  selectedRow: UserRowData;
  userColumns: string[] = [ 'name', 'active', 'edit', 'delete' ];

  constructor(
    private matDialog: MatDialog,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => {
      this.rowData.data = users.map(u => {
        return <UserRowData>{
          isHovered: false,
          userData: u
        };
      });
    });
  }

  clickAddUser() {
    const dialog = this.matDialog.open(EditUserComponent, {
      data: {},
      width: '800px'      
    });

    dialog.afterClosed().subscribe((result: EditUserResultData) => {
      if (result.shouldSave) {
        // Add new user
        const currentData = this.rowData.data;
        let newRow: UserRowData = <UserRowData>{};
        newRow.isHovered = false;
        newRow.userData = result.editedUser;
        currentData.push(newRow);
        this.rowData.data = currentData;
      }
    });
  }

  clickDeleteUser(user: User) {
    this.matDialog.open(ConfirmDialogComponent, {
      data: <ConfirmDialogData>{
        confirmAction: () => {
          this.deleteUser(user);
        },
        confirmText: 'Delete',
        prompt: `Are you sure you want to delete user ${user.fullName}?`,
        rejectText: 'Cancel',
        title: 'Delete User'
      },
      width: '250px'
    });
  }

  clickEditUser(user: User) {
    const dialog = this.matDialog.open(EditUserComponent, {
      data: <EditUserComponentData>{
        editUser: Object.create(user)   // send copy so we can control save/cancel
      },
      width: '800px'      
    });

    dialog.afterClosed().subscribe((result: EditUserResultData) => {
      if (result.shouldSave) {
        // Update edited user.
        let updatedRow = this.rowData.data.find(data => {
          return data.userData.id === result.editedUser.id;
        });
        updatedRow.userData = result.editedUser;
      }
    });
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.id);

    // Handle updating current user screen
    const currentData = this.rowData.data;
    const deleteRow = currentData.findIndex(row => row.userData.id === user.id);
    currentData.splice(deleteRow, 1);
    this.rowData.data = currentData;
  }

  onMouseEnter(row: UserRowData) {
    row.isHovered = true;
  }

  onMouseLeave(row: UserRowData) {
    row.isHovered = false;
  }

  showEditButtons(row: UserRowData): boolean {
    return (row === this.selectedRow) || row.isHovered;
  }

  selectRow(row: UserRowData) {
    this.selectedRow = row;
  }
}
