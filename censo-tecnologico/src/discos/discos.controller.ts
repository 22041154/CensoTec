import { Controller, Post, Body, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBody } from '@nestjs/swagger';
import { DiscosService } from './discos.service'; 
import { GeneralResponse } from '../POCOS/DTO/responses/general-response.dto';

@ApiTags('Discos Duros')
@Controller('discos')
export class DiscosController {

  constructor(private service: DiscosService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener capacidades de disco' })
  @ApiOkResponse({ type: GeneralResponse })
  async all(@Res() response: any) {
    const lista = await this.service.findAll();
    const respuesta: GeneralResponse = {
      data: {
        type: 'discos',
        attributes: { mensaje: 'Lista cargada', contenido: lista }
      }
    };
    return response.status(HttpStatus.OK).json(respuesta);
  }

  @Post()
  @ApiOperation({ summary: 'Crear capacidad de disco' })
  async create(@Body() body: any, @Res() response: any) {
    const nuevo = await this.service.insert(body);
    const respuesta: GeneralResponse = {
      data: {
        type: 'discos',
        attributes: { mensaje: 'Creado exitosamente', contenido: nuevo }
      }
    };
    return response.status(HttpStatus.CREATED).json(respuesta);
  }
}