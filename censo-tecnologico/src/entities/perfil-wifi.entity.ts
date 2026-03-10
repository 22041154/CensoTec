import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cat_perfil_wifi')
export class PerfilWifi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  perfil: string;
}