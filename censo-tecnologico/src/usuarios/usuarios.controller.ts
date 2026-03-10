import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  Param,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('registro')
  async registrar(
    @Body() body: { usuario: string; contrasena: string; role?: string },
  ) {
    if (!body.usuario || !body.contrasena) {
      throw new BadRequestException(
        'Faltan datos: usuario y contrasena son requeridos',
      );
    }

    const existe = await this.usuariosService.encontrarPorNombre(body.usuario);
    if (existe) {
      throw new BadRequestException('El usuario ya existe');
    }

    const created = await this.usuariosService.crear(
      body.usuario,
      body.contrasena,
      body.role,
    );

    return this.usuariosService.findOneById(created.id);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get()
  async list() {
    return this.usuariosService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.usuariosService.findOneById(+id);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.usuariosService.update(+id, body);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usuariosService.remove(+id);
    return { success: true };
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Patch(':id/role')
  async setRole(@Param('id') id: string, @Body() body: { role: string }) {
    if (!body.role) throw new BadRequestException('role is required');
    return this.usuariosService.update(+id, { role: body.role } as any);
  }
}
