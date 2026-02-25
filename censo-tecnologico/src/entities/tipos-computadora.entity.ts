import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Computadoras } from './computadoras.entity'; 

@Entity({ name: 'tipos-computadora' })
export class TiposComputadora { 
  @PrimaryGeneratedColumn()
  idtipocomputadora: number;

  @Column({ length: 50, unique: true })
  tipo: string;

  @OneToMany(
    () => Computadoras, 
    (computadora) => computadora.tipoComputadora,
  )
  computadoras: Computadoras[]; 
}