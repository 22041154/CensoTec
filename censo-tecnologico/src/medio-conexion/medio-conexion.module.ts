import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedioConexionService } from './medio-conexion.service';
import { MedioConexionController } from './medio-conexion.controller';
import { MedioConexion } from '../entities/medio-conexion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedioConexion])],
  controllers: [MedioConexionController],
  providers: [MedioConexionService],
})
export class MedioConexionModule {}