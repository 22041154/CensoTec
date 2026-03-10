import { Module } from '@nestjs/common';
import { ProcesosController } from './procesos.controller';

@Module({
  controllers: [ProcesosController]
})
export class ProcesosModule {}
