import { Test, TestingModule } from '@nestjs/testing';
import { VelocidadInternetService } from './velocidad-internet.service';

describe('VelocidadInternetService', () => {
  let service: VelocidadInternetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VelocidadInternetService],
    }).compile();

    service = module.get<VelocidadInternetService>(VelocidadInternetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
