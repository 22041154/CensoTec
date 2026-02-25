import { Test, TestingModule } from '@nestjs/testing';
import { TipoAdquisicionController } from './tipo-adquisicion.controller';

describe('TipoAdquisicionController', () => {
  let controller: TipoAdquisicionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoAdquisicionController],
    }).compile();

    controller = module.get<TipoAdquisicionController>(TipoAdquisicionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
