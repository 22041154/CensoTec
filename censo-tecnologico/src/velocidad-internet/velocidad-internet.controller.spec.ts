import { Test, TestingModule } from '@nestjs/testing';
import { VelocidadInternetController } from './velocidad-internet.controller';

describe('VelocidadInternetController', () => {
  let controller: VelocidadInternetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VelocidadInternetController],
    }).compile();

    controller = module.get<VelocidadInternetController>(VelocidadInternetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
