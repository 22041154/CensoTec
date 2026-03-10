import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { DatosEscuela } from './DatosEscuela.entity';
import { TipoAdquisicion } from './tipo-adquisicion.entity';

@Entity('conteo_adquisicion')
export class ConteoAdquisicion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  cantidad: number;


  @ManyToOne(() => DatosEscuela, (escuela) => escuela.conteosAdquisicion, {
    onDelete: 'CASCADE', 
  })
  datosEscuela: DatosEscuela;

  @ManyToOne(() => TipoAdquisicion)
  tipoAdquisicion: TipoAdquisicion;
}