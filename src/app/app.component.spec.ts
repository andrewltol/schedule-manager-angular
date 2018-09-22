import { APP_BASE_HREF } from '@angular/common';

import { TestBed, async } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MaterialLayoutModule } from './material-layout/material-layout.module';
import { MaterialLayoutRoutes } from './material-layout/material-layout.routing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        MaterialLayoutModule,
        RouterModule.forRoot(MaterialLayoutRoutes)
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
