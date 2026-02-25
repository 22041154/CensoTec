import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Computadoras } from './computadoras.entity';

@Entity({ name: 'capacidades_disco' })
export class CapacidadesDisco {
  @PrimaryGeneratedColumn()
  idcapacidad: number; 

  @Column({ length: 50, unique: true })
  capacidad: string; 

  @OneToMany(
    () => Computadoras,
    (computadora) => computadora.capacidadDisco,
  )
  computadoras: Computadoras[];
}