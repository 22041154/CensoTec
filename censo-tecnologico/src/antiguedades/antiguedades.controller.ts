import { Controller, Post, Body, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { AntiguedadesService } from './antiguedades.service';
import { GeneralResponse } from '../POCOS/DTO/responses/general-response.dto';

@ApiTags('Antigüedades')
@Controller('antiguedades')
export class AntiguedadesController {

  constructor(private service: AntiguedadesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener rangos de antigüedad' })
  @ApiOkResponse({ type: GeneralResponse })
  async all(@Res() response: any) {
    const lista = await this.service.findAll();
    const respuesta: GeneralResponse = {
      data: {
        type: 'antiguedades',
        attributes: { mensaje: 'Lista cargada', contenido: lista }
      }
    };
    return response.status(HttpStatus.OK).json(respuesta);
  }

  @Post()
  @ApiOperation({ summary: 'Crear rango de antigüedad' })
  async create(@Body() body: any, @Res() response: any) {
    const nuevo = await this.service.insert(body);
    const respuesta: GeneralResponse = {
      data: {
        type: 'antiguedades',
        attributes: { mensaje: 'Creado exitosamente', contenido: nuevo }
      }
    };
    return response.status(HttpStatus.CREATED).json(respuesta);
  }
}