import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';

import { UsersComponent } from './users.component';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { MaterialModules } from 'src/app/material-layout/material-modules.module';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfirmDialogComponent, 
        UsersComponent
      ],
      imports: [
        FormsModule,
        MaterialModules
      ],
      providers: [
        MatDialog,
        UserService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should open edit window for user modification', inject([MatDialog], (matDialog: MatDialog) => {
    // Arrange
    const user = <User>{
      id: 1
    }
    spyOn(matDialog, 'open').and.returnValue(<MatDialogRef<ConfirmDialogComponent>>{
      afterClosed(): Observable<any> {
        return of();
      }
    });

    // Act
    component.clickEditUser(user);

    // Assert
    expect(matDialog.open).toHaveBeenCalled();
  }));

  it('should prompt user for deletion', inject([MatDialog], (matDialog: MatDialog) => {
    // Arrange
    const user = <User>{
      id: 1
    }
    spyOn(matDialog, 'open').and.returnValue(<MatDialogRef<ConfirmDialogComponent>>{
      afterClosed(): Observable<any> {
        return of();
      }
    });

    // Act
    component.clickDeleteUser(user);

    // Assert
    expect(matDialog.open).toHaveBeenCalled();
  }));

  it('should update display data when user is deleted', inject([UserService], (userService: UserService) => {
    // Arrange
    const users = [
      <User>{
        id: 1
      },
      <User>{
        id: 2
      }
    ];
    component.rowData.data = [
      {
        userData: users[0],
        isHovered: false
      },
      {
        userData: users[1],
        isHovered: false
      }
    ];

    // Act
    component.deleteUser(users[0]);
    
    // Assert
    expect(component.rowData.data.length).toBe(1);
    expect(component.rowData.data[0].userData.id).toBe(2);
  }));
});
