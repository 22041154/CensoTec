import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Computadoras } from './computadoras.entity';

@Entity({ name: 'MemoriasRam' })
export class MemoriasRam {
  @PrimaryGeneratedColumn()
  idram: number; 

  @Column({ length: 50, unique: true })
  ram: string;

  @OneToMany(
    () => Computadoras,
    (computadora) => computadora.memoriaRam,
  )
  computadoras: Computadoras[];
}