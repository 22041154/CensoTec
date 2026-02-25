import { Controller, Post, Body, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { TiposComputadoraService } from './tipos-computadora.service';
import { GeneralResponse } from '../POCOS/DTO/responses/general-response.dto';

@ApiTags('Tipos de Computadora')
@Controller('tipos-computadora')
export class TiposComputadoraController {

  constructor(private service: TiposComputadoraService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener tipos de equipo' })
  @ApiOkResponse({ type: GeneralResponse })
  async all(@Res() response: any) {
    const lista = await this.service.findAll();
    const respuesta: GeneralResponse = {
      data: {
        type: 'tipos-computadora',
        attributes: { mensaje: 'Lista cargada', contenido: lista }
      }
    };
    return response.status(HttpStatus.OK).json(respuesta);
  }

  @Post()
  @ApiOperation({ summary: 'Crear tipo de equipo' })
  async create(@Body() body: any, @Res() response: any) {
    const nuevo = await this.service.insert(body);
    const respuesta: GeneralResponse = {
      data: {
        type: 'tipos-computadora',
        attributes: { mensaje: 'Creado exitosamente', contenido: nuevo }
      }
    };
    return response.status(HttpStatus.CREATED).json(respuesta);
  }
}