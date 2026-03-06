import { Injectable } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService
  ) {}

  async validarUsuario(usuario: string, contrasena: string): Promise<any> {
    const user = await this.usuariosService.encontrarPorNombre(usuario);

    if (user && await bcrypt.compare(contrasena, user.contrasena)) {
      const { contrasena: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
    usuario: user.usuario, 
    sub: user.id, 
    role: user.role
  };

  return {
    access_token: this.jwtService.sign(payload),
  };
}
}