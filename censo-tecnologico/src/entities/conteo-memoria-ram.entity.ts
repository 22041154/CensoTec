import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DatosEscuela } from './DatosEscuela.entity';
import { MemoriasRam } from './MemoriasRam.entity';

@Entity({ name: 'conteo_memoria_ram' })
export class ConteoMemoriaRam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  cantidad: number;

  @ManyToOne(() => DatosEscuela, (censo) => censo.conteosRam, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_datos_escuela' })
  censo: DatosEscuela;

  @ManyToOne(() => MemoriasRam)
  @JoinColumn({ name: 'idram' }) 
  memoriaRam: MemoriasRam;
}