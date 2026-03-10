import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { PerfilWifiService } from './perfil-wifi.service';
import { PerfilWifiController } from './perfil-wifi.controller';
import { PerfilWifi } from '../entities/perfil-wifi.entity'; 

@Module({
  imports: [
  
    TypeOrmModule.forFeature([PerfilWifi]), 
  ],
  controllers: [PerfilWifiController],
  providers: [PerfilWifiService],
})
export class PerfilWifiModule {}