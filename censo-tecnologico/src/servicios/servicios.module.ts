import { Module } from '@nestjs/common';
import { ServiciosController } from './servicios.controller';

@Module({
  controllers: [ServiciosController]
})
export class ServiciosModule {}
