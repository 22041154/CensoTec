import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEducativoComponent } from './detalle-educativo';

describe('DetalleEducativo', () => {
  let component: DetalleEducativoComponent;
  let fixture: ComponentFixture<DetalleEducativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleEducativoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleEducativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
