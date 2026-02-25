import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DatosEscuela } from './DatosEscuela.entity';
import { Antiguedades } from './antiguedades.entity';

@Entity({ name: 'conteo_antiguedad' })
export class ConteoAntiguedad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  cantidad: number;

  @ManyToOne(() => DatosEscuela, (censo) => censo.conteosAntiguedad, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_datos_escuela' })
  censo: DatosEscuela;

  @ManyToOne(() => Antiguedades)
  @JoinColumn({ name: 'idantiguedad' }) 
  antiguedad: Antiguedades;
}