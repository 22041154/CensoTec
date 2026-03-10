import { Controller, Post, Body, Get, Patch, Param, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DatosEscuelaService } from './datos-escuela.service';

@Controller('datos-escuela')
@UseGuards(AuthGuard('jwt')) 
export class DatosEscuelaController {
  constructor(private service: DatosEscuelaService) {}

  @Post() 
  async save(@Body() body: any, @Req() req: any) {
    return await this.service.guardar(body, req.user.userId);
  }

  @Get('mi-progreso') 
  async getProgreso(@Req() req: any) {
    return await this.service.buscarPorUsuario(req.user.userId);
  }

  @Get('disponibles/departamentos')
  async obtenerDepartamentosDisponibles() {
    return await this.service.obtenerDepartamentosDisponibles();
  }

  @Get(':id') 
  async findOne(@Param('id') id: string) {
    return await this.service.findOne(+id);
  }

  @Patch(':id') 
  async update(@Param('id') id: string, @Body() body: any) {
    return await this.service.actualizar(+id, body);
  }
}