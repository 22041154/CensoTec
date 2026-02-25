import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VelocidadInternetService } from './velocidad-internet.service';
import { VelocidadInternetController } from './velocidad-internet.controller';
import { VelocidadInternet } from '../entities/velocidad-internet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VelocidadInternet])],
  controllers: [VelocidadInternetController],
  providers: [VelocidadInternetService],
})
export class VelocidadInternetModule {}