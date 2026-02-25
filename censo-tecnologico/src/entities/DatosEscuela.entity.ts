import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { ConteoMemoriaRam } from './conteo-memoria-ram.entity';
import { ConteoSistemaOperativo } from './conteo-sistema-operativo.entity';
import { ConteoCapacidadDisco } from './conteo-capacidad-disco.entity';
import { ConteoAntiguedad } from './conteo-antiguedad.entity';
import { ConteoTipoComputadora } from './conteo-tipo-computadora.entity';
import { Usuario } from './Usuario.entity';
import { ConteoAdquisicion } from './conteo-adquisicion.entity'; 
import { MedioConexion } from './medio-conexion.entity';
import { VelocidadInternet } from './velocidad-internet.entity';
import { PerfilWifi } from './perfil-wifi.entity'; 

@Entity({ name: 'datos_escuela' })
export class DatosEscuela {
  @PrimaryGeneratedColumn()
  iddatos: number;

  @Column('int', { nullable: true })
  operativas: number;

  @Column('int', { nullable: true })
  reparacion: number;

  @Column('int', { nullable: true })
  reserva: number;

  @Column('int', { nullable: true })
  uso_educativo: number;

  @Column('int', { nullable: true })
  uso_docente: number;

  @Column('int', { nullable: true })
  uso_administrativo: number;

  @Column('int', { nullable: true })
  internet_educativo: number;

  @Column('int', { nullable: true })
  internet_docente: number;

  @Column('int', { nullable: true })
  internet_administrativo: number;

  @Column('int', { nullable: true })
  total_uso: number;

  @Column('int', { nullable: true })
  total_internet: number;

  
  @Column({ type: 'varchar', length: 100, nullable: true })
  departamento: string;

  @Column({ 
    type: 'enum', 
    enum: ['DEDICADA', 'CABLE', 'SATELITE', 'WIFI', 'TELEFONICA', 'OTRO', 'NO_SABE'],
    nullable: true 
  })
  medio_conexion_internet: string;

  @Column({ 
    type: 'enum', 
    enum: ['MENOS_6MB', '6_A_10MB', '11_A_25MB', '26_A_100MB', 'MAS_100MB'],
    nullable: true 
  })
  velocidad_conexion: string;

  @Column({ type: 'int', default: 0 })
  computadorasConInternet: number; 

  @Column({ type: 'int', default: 0 })
  computadorasSinInternet: number; 

  @Column({ nullable: true })
  tiene_impresora_estudiantes: boolean;

  @Column({ nullable: true })
  impresiones_gratuitas: boolean;

  @Column({ nullable: true })
  tiene_servidores: boolean;

  @Column('int', { default: 0 })
  cantidad_servidores: number;

  @Column({ nullable: true })
  tiene_wifi_publico: boolean;

  @ManyToMany(() => PerfilWifi)
  @JoinTable({ name: 'datos_escuela_perfiles_wifi' })
  perfilesWifiSeleccionados: PerfilWifi[];

  @OneToMany(() => ConteoMemoriaRam, (conteo) => conteo.censo, { cascade: true })
  conteosRam: ConteoMemoriaRam[];

  @OneToMany(() => ConteoSistemaOperativo, (conteo) => conteo.censo, { cascade: true })
  conteosSO: ConteoSistemaOperativo[];

  @OneToMany(() => ConteoCapacidadDisco, (conteo) => conteo.censo, { cascade: true })
  conteosDisco: ConteoCapacidadDisco[];

  @OneToMany(() => ConteoAntiguedad, (conteo) => conteo.censo, { cascade: true })
  conteosAntiguedad: ConteoAntiguedad[];

  @OneToMany(() => ConteoTipoComputadora, (conteo) => conteo.censo, { cascade: true })
  conteosTipo: ConteoTipoComputadora[];

  @OneToMany(() => ConteoAdquisicion, (conteo) => conteo.datosEscuela, { cascade: true })
  conteosAdquisicion: ConteoAdquisicion[];

  @ManyToMany(() => MedioConexion)
  @JoinTable({ name: 'datos_escuela_medios_seleccionados' }) 
  mediosConexionSeleccionados: MedioConexion[];

  @ManyToMany(() => VelocidadInternet)
  @JoinTable({ name: 'datos_escuela_velocidades_seleccionadas' }) 
  velocidadesInternetSeleccionadas: VelocidadInternet[];

  @ManyToOne(() => Usuario, { nullable: false }) 
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;

  @Column({ nullable: true })
  usuarioId: number;
}