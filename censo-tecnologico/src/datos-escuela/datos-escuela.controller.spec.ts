import { Test, TestingModule } from '@nestjs/testing';
import { DatosEscuelaController } from './datos-escuela.controller';

describe('DatosEscuelaController', () => {
  let controller: DatosEscuelaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatosEscuelaController],
    }).compile();

    controller = module.get<DatosEscuelaController>(DatosEscuelaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
