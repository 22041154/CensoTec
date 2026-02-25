import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http'; 
import { provideHttpClientTesting } from '@angular/common/http/testing'; 
import { CensoApiService } from './censo-api';

describe('CensoApi', () => {
  let service: CensoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(), 
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CensoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});