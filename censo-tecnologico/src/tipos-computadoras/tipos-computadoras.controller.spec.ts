import { Test, TestingModule } from '@nestjs/testing';
import { TiposComputadorasController } from './tipos-computadoras.controller';

describe('TiposComputadorasController', () => {
  let controller: TiposComputadorasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiposComputadorasController],
    }).compile();

    controller = module.get<TiposComputadorasController>(TiposComputadorasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
