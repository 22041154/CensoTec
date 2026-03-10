import { Test, TestingModule } from '@nestjs/testing';
import { SistemasOperativosController } from './SistemasOperativos.controller';

describe('SistemasOperativosController', () => {
  let controller: SistemasOperativosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SistemasOperativosController],
    }).compile();

    controller = module.get<SistemasOperativosController>(SistemasOperativosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
