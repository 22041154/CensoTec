import { Test, TestingModule } from '@nestjs/testing';
import { TiposComputadoraService } from './tipos-computadora.service';

describe('TiposComputadoraService', () => {
  let service: TiposComputadoraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiposComputadoraService],
    }).compile();

    service = module.get<TiposComputadoraService>(TiposComputadoraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
