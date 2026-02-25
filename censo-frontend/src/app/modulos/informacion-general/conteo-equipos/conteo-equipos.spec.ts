import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteoEquipos } from './conteo-equipos';

describe('ConteoEquipos', () => {
  let component: ConteoEquipos;
  let fixture: ComponentFixture<ConteoEquipos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConteoEquipos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConteoEquipos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
