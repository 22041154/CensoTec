import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Computadoras } from './computadoras.entity';

@Entity({ name: 'antiguedades' })
export class Antiguedades {
  @PrimaryGeneratedColumn()
  idantiguedad: number; 

  @Column({ length: 50, unique: true })
  antiguedad: string; 

  @OneToMany(
    () => Computadoras,
    (computadora) => computadora.antiguedad,
  )
  computadoras: Computadoras[];
}
