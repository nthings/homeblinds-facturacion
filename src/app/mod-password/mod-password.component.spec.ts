import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModPasswordComponent } from './mod-password.component';

describe('ModPasswordComponent', () => {
  let component: ModPasswordComponent;
  let fixture: ComponentFixture<ModPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
