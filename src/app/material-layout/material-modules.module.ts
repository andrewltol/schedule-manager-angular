import { NgModule } from '@angular/core';

import { MatRippleModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSidenavModule,
    MatTableModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSidenavModule,
    MatTableModule
  ]
})
export class MaterialModules {}