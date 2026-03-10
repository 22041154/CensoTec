import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';

import { DatosEscuelaModule } from './datos-escuela/datos-escuela.module'; 
import { ComputadorasModule } from './computadoras/computadoras.module';   
import { MemoriasRamModule } from './MemoriasRam/MemoriasRam.module';      
import { SistemasOperativosModule } from './SistemasOperativos/SistemasOperativos.module'; 
import { DiscosModule } from './discos/discos.module';                     
import { AntiguedadesModule } from './antiguedades/antiguedades.module';   
import { TiposComputadoraModule } from './tipos-computadora/tipos-computadora.module'; 
import { TipoAdquisicionModule } from './tipo-adquisicion/tipo-adquisicion.module';
import { MedioConexionModule } from './medio-conexion/medio-conexion.module';
import { VelocidadInternetModule } from './velocidad-internet/velocidad-internet.module';

import { Computadoras } from './entities/computadoras.entity';
import { TiposComputadora } from './entities/tipos-computadora.entity';
import { MemoriasRam } from './entities/MemoriasRam.entity';
import { CapacidadesDisco } from './entities/capacidades_disco.entity';
import { Antiguedades } from './entities/antiguedades.entity';
import { SistemasOperativos } from './entities/SistemasOperativos.entity';
import { Usuario } from './entities/Usuario.entity';
import { DatosEscuela } from './entities/DatosEscuela.entity';

import { ConteoMemoriaRam } from './entities/conteo-memoria-ram.entity';
import { ConteoSistemaOperativo } from './entities/conteo-sistema-operativo.entity';
import { ConteoCapacidadDisco } from './entities/conteo-capacidad-disco.entity';
import { ConteoAntiguedad } from './entities/conteo-antiguedad.entity';
import { ConteoTipoComputadora } from './entities/conteo-tipo-computadora.entity';
import { ConteoAdquisicion } from './entities/conteo-adquisicion.entity';
import { PerfilWifiModule } from './perfil-wifi/perfil-wifi.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'CensoUser', 
      password: '1234',      
      database: 'CensoTecnologico',  
      entities: [
        Usuario, DatosEscuela, Computadoras,
        TiposComputadora, MemoriasRam, CapacidadesDisco, Antiguedades, SistemasOperativos,ConteoAdquisicion,
        ConteoMemoriaRam, ConteoSistemaOperativo, ConteoCapacidadDisco, ConteoAntiguedad, ConteoTipoComputadora
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),

    AuthModule,
    UsuariosModule,
   
    DatosEscuelaModule,
    
    ComputadorasModule,
    MemoriasRamModule,
    SistemasOperativosModule,
    DiscosModule,
    AntiguedadesModule,
    TiposComputadoraModule,
    
    TipoAdquisicionModule,
    MedioConexionModule,
    VelocidadInternetModule,
    PerfilWifiModule,
  ],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}