import { Test, TestingModule } from '@nestjs/testing';
import { PerfilWifiController } from './perfil-wifi.controller';

describe('PerfilWifiController', () => {
  let controller: PerfilWifiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerfilWifiController],
    }).compile();

    controller = module.get<PerfilWifiController>(PerfilWifiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
