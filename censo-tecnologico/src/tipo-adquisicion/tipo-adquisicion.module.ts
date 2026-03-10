import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoAdquisicionService } from './tipo-adquisicion.service';
import { TipoAdquisicionController } from './tipo-adquisicion.controller';
import { TipoAdquisicion } from '../entities/tipo-adquisicion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoAdquisicion])],
  controllers: [TipoAdquisicionController],
  providers: [TipoAdquisicionService],
})
export class TipoAdquisicionModule {}