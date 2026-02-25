import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cat_medio_conexion')
export class MedioConexion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  medio: string;
}