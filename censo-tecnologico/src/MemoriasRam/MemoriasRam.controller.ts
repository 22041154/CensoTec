import { Controller, Post, Body, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBody } from '@nestjs/swagger';
import { MemoriasRamService } from './MemoriasRam.service';
import { GeneralResponse } from '../POCOS/DTO/responses/general-response.dto';

@ApiTags('Memorias RAM')
@Controller('MemoriasRam')
export class MemoriasRamController {

  constructor(private service: MemoriasRamService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener lista de Memorias RAM' })
  @ApiOkResponse({ type: GeneralResponse })
  async all(@Res() response: any) {
    
    const lista = await this.service.findAll();

    const respuesta: GeneralResponse = {
      data: {
        type: 'memorias-ram',
        attributes: {
          mensaje: 'Lista cargada correctamente',
          contenido: lista
        }
      }
    };

    return response.status(HttpStatus.OK).json(respuesta);
  }

  @Post()
  @ApiOperation({ summary: 'Crear nueva Memoria RAM' })
  @ApiBody({ schema: { example: { ram: '32 GB RGB' } } })
  async create(@Body() body: any, @Res() response: any) {
    
    const nuevo = await this.service.insert(body);

    const respuesta: GeneralResponse = {
      data: {
        type: 'memorias-ram',
        attributes: {
          mensaje: 'Registro creado exitosamente',
          contenido: nuevo
        }
      }
    };

    return response.status(HttpStatus.CREATED).json(respuesta);
  }
}