import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { TiposComputadora } from './tipos-computadora.entity'; 
import { MemoriasRam } from './MemoriasRam.entity'; 
import { CapacidadesDisco } from './capacidades_disco.entity'; 
import { SistemasOperativos } from './SistemasOperativos.entity'; 
import { Antiguedades } from './antiguedades.entity'; 

@Entity({ name: 'computadoras' })
export class Computadoras {
  @PrimaryGeneratedColumn()
  idcomputadora: number;

  @Column({ length: 100 })
  NombreResponsable: string;


  @Column({
    type: 'enum',
    enum: ['OPERATIVA', 'EN REPARACION', 'BAJA', 'RESERVA'],
    default: 'OPERATIVA'
  })
  estatus: string;

  @Column({
    type: 'enum',
    enum: ['EDUCATIVO', 'DOCENTE', 'ADMINISTRATIVO'],
    default: 'EDUCATIVO'
  })
  uso: string;

  @Column({
    type: 'enum',
    enum: ['COMPRADA', 'RENTADA', 'PRESTAMO', 'DONADA'],
    default: 'COMPRADA'
  })
  tipo_adquisicion: string;

  @Column({ default: false })
  con_internet: boolean;

  @Column({ default: false })
  en_red_local: boolean;


  @ManyToOne(() => TiposComputadora, (tipo) => tipo.computadoras)
  @JoinColumn({ name: 'idtipocomputadora' })
  tipoComputadora: TiposComputadora;

  @ManyToOne(() => MemoriasRam, (ram) => ram.computadoras)
  @JoinColumn({ name: 'idram' })
  memoriaRam: MemoriasRam;

  @ManyToOne(() => CapacidadesDisco, (disco) => disco.computadoras)
  @JoinColumn({ name: 'idcapacidad' })
  capacidadDisco: CapacidadesDisco;

  @ManyToOne(() => SistemasOperativos, (so) => so.computadoras)
  @JoinColumn({ name: 'idsistema' })
  sistemaOperativo: SistemasOperativos;

  @ManyToOne(() => Antiguedades, (ant) => ant.computadoras)
  @JoinColumn({ name: 'idantiguedad' })
  antiguedad: Antiguedades;

  @CreateDateColumn()
  fecha_registro: Date;
}