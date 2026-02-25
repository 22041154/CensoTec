import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AntiguedadesController } from './antiguedades.controller';
import { AntiguedadesService } from './antiguedades.service';
import { Antiguedades } from '../entities/antiguedades.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Antiguedades])],
  controllers: [AntiguedadesController],
  providers: [AntiguedadesService],
})
export class AntiguedadesModule {}
