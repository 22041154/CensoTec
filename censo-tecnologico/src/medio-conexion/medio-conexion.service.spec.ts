import { Test, TestingModule } from '@nestjs/testing';
import { MedioConexionService } from './medio-conexion.service';

describe('MedioConexionService', () => {
  let service: MedioConexionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedioConexionService],
    }).compile();

    service = module.get<MedioConexionService>(MedioConexionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
