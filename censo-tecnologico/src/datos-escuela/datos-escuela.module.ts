import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatosEscuelaService } from './datos-escuela.service';
import { DatosEscuelaController } from './datos-escuela.controller';
import { DatosEscuela } from '../entities/DatosEscuela.entity';

import { ConteoMemoriaRam } from '../entities/conteo-memoria-ram.entity';
import { ConteoSistemaOperativo } from '../entities/conteo-sistema-operativo.entity';
import { ConteoCapacidadDisco } from '../entities/conteo-capacidad-disco.entity';
import { ConteoAntiguedad } from '../entities/conteo-antiguedad.entity';
import { ConteoTipoComputadora } from '../entities/conteo-tipo-computadora.entity';
import { ConteoAdquisicion } from '../entities/conteo-adquisicion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DatosEscuela,
      ConteoMemoriaRam,
      ConteoSistemaOperativo,
      ConteoCapacidadDisco,
      ConteoAntiguedad,
      ConteoTipoComputadora,
      ConteoAdquisicion,
    ]),
  ],
  controllers: [DatosEscuelaController],
  providers: [DatosEscuelaService],
})
export class DatosEscuelaModule {}