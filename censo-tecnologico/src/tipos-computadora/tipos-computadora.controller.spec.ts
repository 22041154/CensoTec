import { Test, TestingModule } from '@nestjs/testing';
import { TiposComputadoraController } from './tipos-computadora.controller';

describe('TiposComputadoraController', () => {
  let controller: TiposComputadoraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiposComputadoraController],
    }).compile();

    controller = module.get<TiposComputadoraController>(TiposComputadoraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
