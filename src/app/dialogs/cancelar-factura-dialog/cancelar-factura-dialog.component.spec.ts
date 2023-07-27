import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarFacturaDialogComponent } from './cancelar-factura-dialog.component';

describe('CancelarFacturaDialogComponent', () => {
  let component: CancelarFacturaDialogComponent;
  let fixture: ComponentFixture<CancelarFacturaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelarFacturaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelarFacturaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
