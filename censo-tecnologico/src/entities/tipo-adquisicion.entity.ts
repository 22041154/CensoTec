import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cat_tipo_adquisicion')
export class TipoAdquisicion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;
}