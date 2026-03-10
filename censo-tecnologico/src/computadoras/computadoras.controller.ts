import { Controller, Get, Post, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBody } from '@nestjs/swagger';
import { ComputadorasService } from './Computadoras.service';
import { GeneralResponse } from '../POCOS/DTO/responses/general-response.dto';
import { CreateComputadoraDto } from './dto/create-computadora.dto';

@ApiTags('Computadoras (Inventario)')
@Controller('computadoras')
export class ComputadorasController {

  constructor(private readonly logic: ComputadorasService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las computadoras registradas' })
  @ApiOkResponse({ type: GeneralResponse })
  async getAll(@Res() response: any) {
    const lista = await this.logic.findAll();
    
    const respuesta: GeneralResponse = {
      data: {
        type: 'computadoras',
        attributes: {
          mensaje: 'Inventario cargado correctamente',
          contenido: lista
        }
      }
    };
    return response.status(HttpStatus.OK).json(respuesta);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar computadora por ID' })
  async getOne(@Param('id') id: number, @Res() response: any) {
    const encontrada = await this.logic.findOne(id);
    
    const respuesta: GeneralResponse = {
      data: {
        type: 'computadoras',
        attributes: {
          mensaje: encontrada ? 'Computadora encontrada' : 'No existe',
          contenido: encontrada
        }
      }
    };
    
    const status = encontrada ? HttpStatus.OK : HttpStatus.NOT_FOUND;
    return response.status(status).json(respuesta);
  }

  @Post()
  @ApiOperation({ summary: 'Registrar nueva computadora' })
  @ApiBody({ type: CreateComputadoraDto }) 
  async create(@Body() body: CreateComputadoraDto, @Res() response: any) {
    
    const nuevo = await this.logic.create(body);

    const respuesta: GeneralResponse = {
      data: {
        type: 'computadoras',
        attributes: {
          mensaje: 'Computadora registrada exitosamente',
          contenido: nuevo
        }
      }
    };
    return response.status(HttpStatus.CREATED).json(respuesta);
  }
}