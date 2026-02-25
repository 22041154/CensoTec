import { Module } from '@nestjs/common';
import { TiposComputadorasController } from './tipos-computadoras.controller';

@Module({
  controllers: [TiposComputadorasController]
})
export class TiposComputadorasModule {}
