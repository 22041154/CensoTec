import { Controller, Post, Body, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBody } from '@nestjs/swagger';
import { SistemasOperativosService } from './SistemasOperativos.service';
import { GeneralResponse } from '../POCOS/DTO/responses/general-response.dto';

@ApiTags('Sistemas Operativos')
@Controller('SistemasOperativos')
export class SistemasOperativosController {

  constructor(private service: SistemasOperativosService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener lista de Sistemas Operativos' })
  @ApiOkResponse({ type: GeneralResponse })
  async all(@Res() response: any) {
    const lista = await this.service.findAll();
    const respuesta: GeneralResponse = {
      data: {
        type: 'sistemas-operativos',
        attributes: { mensaje: 'Lista cargada', contenido: lista }
      }
    };
    return response.status(HttpStatus.OK).json(respuesta);
  }

  @Post()
  @ApiOperation({ summary: 'Crear Sistema Operativo' })
  @ApiBody({ schema: { example: { nombresistema: 'Ubuntu 22.04' } } })
  async create(@Body() body: any, @Res() response: any) {
    const nuevo = await this.service.insert(body);
    const respuesta: GeneralResponse = {
      data: {
        type: 'sistemas-operativos',
        attributes: { mensaje: 'Creado exitosamente', contenido: nuevo }
      }
    };
    return response.status(HttpStatus.CREATED).json(respuesta);
  }
}