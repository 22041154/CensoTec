import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DatosEscuela } from './DatosEscuela.entity';
import { TiposComputadora } from './tipos-computadora.entity';

@Entity({ name: 'conteo_tipo_computadora' })
export class ConteoTipoComputadora {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  cantidad: number;

  @ManyToOne(() => DatosEscuela, (censo) => censo.conteosTipo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_datos_escuela' })
  censo: DatosEscuela;

  @ManyToOne(() => TiposComputadora)
  @JoinColumn({ name: 'idtipocomputadora' }) 
  tipoComputadora: TiposComputadora;
}