import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoriasRamController } from './MemoriasRam.controller';
import { MemoriasRamService } from './MemoriasRam.service'; // Asegúrate de importar el Service
import { MemoriasRam } from '../entities/MemoriasRam.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MemoriasRam])
  ],
  controllers: [MemoriasRamController],
  providers: [MemoriasRamService] // Aquí registramos el Service
})
export class MemoriasRamModule {}