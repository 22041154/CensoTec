import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { VelocidadInternetService } from './velocidad-internet.service';
import { GeneralResponse } from '../POCOS/DTO/responses/general-response.dto';

@ApiTags('Catálogo: Velocidad Internet')
@Controller('velocidad-internet')
export class VelocidadInternetController {
  constructor(private readonly service: VelocidadInternetService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener rangos de velocidad' })
  @ApiOkResponse({ type: GeneralResponse })
  async findAll(@Res() response: any) {
    const lista = await this.service.findAll();
    const respuesta: GeneralResponse = {
      data: {
        type: 'velocidad-internet',
        attributes: { mensaje: 'Lista cargada', contenido: lista }
      }
    };
    return response.status(HttpStatus.OK).json(respuesta);
  }
}