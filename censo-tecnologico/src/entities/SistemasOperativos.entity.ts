import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Computadoras } from './computadoras.entity';

@Entity({ name: 'SistemasOperativos' })
export class SistemasOperativos {
  @PrimaryGeneratedColumn()
  idsistema: number; 

  @Column({ length: 100, unique: true })
  nombresistema: string; 

  @OneToMany(
    () => Computadoras,
    (computadora) => computadora.sistemaOperativo,
  )
  computadoras: Computadoras[];
}