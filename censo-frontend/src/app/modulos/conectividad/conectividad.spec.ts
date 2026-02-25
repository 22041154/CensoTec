import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Conectividad } from './conectividad';

describe('Conectividad', () => {
  let component: Conectividad;
  let fixture: ComponentFixture<Conectividad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Conectividad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Conectividad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
