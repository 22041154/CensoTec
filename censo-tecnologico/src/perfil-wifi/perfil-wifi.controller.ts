import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PerfilWifiService } from './perfil-wifi.service';

@ApiTags('Catálogo: Perfil WiFi')
@Controller('perfil-wifi')
export class PerfilWifiController {
  constructor(private readonly service: PerfilWifiService) {}

  @Get()
  async findAll(@Res() response: any) {
    const lista = await this.service.findAll();
    return response.status(HttpStatus.OK).json({
      data: { type: 'perfil-wifi', attributes: { contenido: lista } }
    });
  }
}