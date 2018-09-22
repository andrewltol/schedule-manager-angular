import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ConfirmDialogComponent } from './confirm-dialog.component';

import { FakeMatDialogRef } from 'testing/fake-services';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfirmDialogComponent
      ],
      imports: [
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useClass: FakeMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should close on confirm button click', inject([MatDialogRef], (matDialogRef: FakeMatDialogRef) => {
    // Arrange
    spyOn(matDialogRef, 'close');

    // Act
    component.onConfirm();

    // Assert
    expect(matDialogRef.close).toHaveBeenCalledTimes(1);
  }));

  it('should close on reject button click', inject([MatDialogRef], (matDialogRef: FakeMatDialogRef) => {
    // Arrange
    spyOn(matDialogRef, 'close');

    // Act
    component.onReject();

    // Assert
    expect(matDialogRef.close).toHaveBeenCalledTimes(1);
  }));
});
