import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TiposComputadora } from 'src/entities/tipos-computadora.entity';
import { TiposComputadoraController } from './tipos-computadora.controller';
import { TiposComputadoraService } from './tipos-computadora.service';

@Module({
  imports: [TypeOrmModule.forFeature([TiposComputadora])],
  controllers: [TiposComputadoraController],
  providers: [TiposComputadoraService],
  exports: [TypeOrmModule]
})
export class TiposComputadoraModule {}
