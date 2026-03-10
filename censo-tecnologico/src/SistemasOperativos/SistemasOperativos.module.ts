import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { SistemasOperativosController } from './SistemasOperativos.controller';
import { SistemasOperativosService } from './SistemasOperativos.service'; 
import { SistemasOperativos } from 'src/entities/SistemasOperativos.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([SistemasOperativos])], 
  controllers: [SistemasOperativosController],
  providers: [SistemasOperativosService],
})
export class SistemasOperativosModule {}