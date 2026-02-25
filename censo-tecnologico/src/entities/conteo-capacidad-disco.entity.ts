import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DatosEscuela } from './DatosEscuela.entity';
import { CapacidadesDisco } from './capacidades_disco.entity'; 

@Entity({ name: 'conteo_capacidad_disco' })
export class ConteoCapacidadDisco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  cantidad: number;

  @ManyToOne(() => DatosEscuela, (censo) => censo.conteosDisco, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_datos_escuela' })
  censo: DatosEscuela;

  @ManyToOne(() => CapacidadesDisco)
  @JoinColumn({ name: 'idcapacidad' })
  capacidadDisco: CapacidadesDisco;
}