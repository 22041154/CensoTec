import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscosController } from './discos.controller';
import { DiscosService } from './discos.service';
import { CapacidadesDisco } from '../entities/capacidades_disco.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CapacidadesDisco]) 
  ],
  controllers: [DiscosController],
  providers: [DiscosService] 
})
export class DiscosModule {}