import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Computadoras } from '../entities/computadoras.entity'; 
import { ComputadorasController } from './computadoras.controller';
import { ComputadorasService } from './Computadoras.service';

@Module({
  imports: [TypeOrmModule.forFeature([Computadoras])],
  controllers: [ComputadorasController],
  providers: [ComputadorasService], 
})
export class ComputadorasModule {}