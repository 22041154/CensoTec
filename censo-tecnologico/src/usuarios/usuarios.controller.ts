import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('registro')
  async registrar(@Body() body: { usuario: string; contrasena: string }) {
    if (!body.usuario || !body.contrasena) {
      throw new BadRequestException('Faltan datos: usuario y contrasena son requeridos');
    }

    const existe = await this.usuariosService.encontrarPorNombre(body.usuario);
    if (existe) {
      throw new BadRequestException('El usuario ya existe');
    }

    return this.usuariosService.crear(body.usuario, body.contrasena);
  }
}