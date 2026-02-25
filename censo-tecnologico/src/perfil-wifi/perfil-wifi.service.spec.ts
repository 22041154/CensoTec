import { Test, TestingModule } from '@nestjs/testing';
import { PerfilWifiService } from './perfil-wifi.service';

describe('PerfilWifiService', () => {
  let service: PerfilWifiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerfilWifiService],
    }).compile();

    service = module.get<PerfilWifiService>(PerfilWifiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
