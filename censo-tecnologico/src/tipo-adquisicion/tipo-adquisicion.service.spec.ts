import { Test, TestingModule } from '@nestjs/testing';
import { TipoAdquisicionService } from './tipo-adquisicion.service';

describe('TipoAdquisicionService', () => {
  let service: TipoAdquisicionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoAdquisicionService],
    }).compile();

    service = module.get<TipoAdquisicionService>(TipoAdquisicionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
