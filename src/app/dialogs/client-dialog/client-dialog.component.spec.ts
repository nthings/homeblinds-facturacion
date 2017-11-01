import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentDialogComponent } from './client-dialog.component';

describe('DepartmentDialogComponent', () => {
  let component: DepartmentDialogComponent;
  let fixture: ComponentFixture<DepartmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
