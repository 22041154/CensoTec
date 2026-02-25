import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/entities/Usuario.entity';
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async crear(usuario: string, contrasena: string): Promise<Usuario> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(contrasena, salt);

    const nuevoUsuario = this.usuarioRepository.create({
      usuario,
      contrasena: hash, 
    });

    return this.usuarioRepository.save(nuevoUsuario);
  }
  async encontrarPorNombre(usuario: string): Promise<Usuario | null> {
  return this.usuarioRepository.findOne({ where: { usuario } });
}
}