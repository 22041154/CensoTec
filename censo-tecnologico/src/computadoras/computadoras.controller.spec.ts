import { Test, TestingModule } from '@nestjs/testing';
import { ComputadorasController } from './computadoras.controller';

describe('ComputadorasController', () => {
  let controller: ComputadorasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComputadorasController],
    }).compile();

    controller = module.get<ComputadorasController>(ComputadorasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
