import { Test, TestingModule } from '@nestjs/testing';
import { MedioConexionController } from './medio-conexion.controller';

describe('MedioConexionController', () => {
  let controller: MedioConexionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedioConexionController],
    }).compile();

    controller = module.get<MedioConexionController>(MedioConexionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
