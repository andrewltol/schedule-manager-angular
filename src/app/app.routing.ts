import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MaterialLayoutModule } from './material-layout/material-layout.module';
import { MaterialLayoutRoutes } from 'src/app/material-layout/material-layout.routing';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    MaterialLayoutModule,
    RouterModule.forRoot(MaterialLayoutRoutes)
  ]
})

export class AppRoutingModule {}