import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConexionInternetComponent } from './conexion-internet';

describe('ConexionInternet', () => {
  let component: ConexionInternetComponent;
  let fixture: ComponentFixture<ConexionInternetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConexionInternetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConexionInternetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
