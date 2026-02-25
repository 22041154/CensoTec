import { Test, TestingModule } from '@nestjs/testing';
import { MemoriasRamController } from './MemoriasRam.controller';

describe('MemoriasRamController', () => {
  let controller: MemoriasRamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemoriasRamController],
    }).compile();

    controller = module.get<MemoriasRamController>(MemoriasRamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
