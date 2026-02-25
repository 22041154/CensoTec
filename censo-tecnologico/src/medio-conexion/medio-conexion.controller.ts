import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { MedioConexionService } from './medio-conexion.service';
import { GeneralResponse } from '../POCOS/DTO/responses/general-response.dto';

@ApiTags('Catálogo: Medio Conexión')
@Controller('medio-conexion')
export class MedioConexionController {
  constructor(private readonly service: MedioConexionService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener medios de conexión' })
  @ApiOkResponse({ type: GeneralResponse })
  async findAll(@Res() response: any) {
    const lista = await this.service.findAll();
    const respuesta: GeneralResponse = {
      data: {
        type: 'medio-conexion',
        attributes: { mensaje: 'Lista cargada', contenido: lista }
      }
    };
    return response.status(HttpStatus.OK).json(respuesta);
  }
}