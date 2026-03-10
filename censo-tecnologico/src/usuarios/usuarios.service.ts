import { Injectable, OnModuleInit } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/entities/Usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService implements OnModuleInit { 
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async onModuleInit() {
    const adminUsuario = 'admin';
    const adminPassword = 'pass123'; 
    const adminExiste = await this.encontrarPorNombre(adminUsuario);
    if (!adminExiste) {
      await this.crear(adminUsuario, adminPassword, 'admin');
    }
  }

  async crear(
    usuario: string,
    contrasena: string,
    role: string = 'user',
  ): Promise<Usuario> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(contrasena, salt);

    const nuevoUsuario = this.usuarioRepository.create({
      usuario,
      contrasena: hash,
      role: role === 'admin' ? 'admin' : 'user',
    });

    return this.usuarioRepository.save(nuevoUsuario);
  }

  async encontrarPorNombre(usuario: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { usuario } });
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      select: ['id', 'usuario', 'role'],
    });
  }

  async findOneById(id: number): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<Usuario>): Promise<Usuario> {
    if (data.contrasena) {
      const salt = await bcrypt.genSalt();
      data.contrasena = await bcrypt.hash(data.contrasena, salt);
    }
    await this.usuarioRepository.update(id, data as any);
    return this.findOneById(id) as Promise<Usuario>;
  }

  async remove(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}