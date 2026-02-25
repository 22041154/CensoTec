import { Test, TestingModule } from '@nestjs/testing';
import { AntiguedadesController } from './antiguedades.controller';

describe('AntiguedadesController', () => {
  let controller: AntiguedadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AntiguedadesController],
    }).compile();

    controller = module.get<AntiguedadesController>(AntiguedadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
