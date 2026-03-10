import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DatosEscuela } from './DatosEscuela.entity';
import { SistemasOperativos } from './SistemasOperativos.entity';

@Entity({ name: 'conteo_sistema_operativo' })
export class ConteoSistemaOperativo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  cantidad: number;

  @ManyToOne(() => DatosEscuela, (censo) => censo.conteosSO, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_datos_escuela' })
  censo: DatosEscuela;

  @ManyToOne(() => SistemasOperativos)
  @JoinColumn({ name: 'idsistema' }) 
  sistemaOperativo: SistemasOperativos;
}