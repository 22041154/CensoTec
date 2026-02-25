import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cat_velocidad_internet')
export class VelocidadInternet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rango: string;
}