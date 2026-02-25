import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { TipoAdquisicionService } from './tipo-adquisicion.service';
import { GeneralResponse } from '../POCOS/DTO/responses/general-response.dto';

@ApiTags('Catálogo: Tipo Adquisición')
@Controller('tipo-adquisicion')
export class TipoAdquisicionController {
  constructor(private readonly service: TipoAdquisicionService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener tipos de adquisición' })
  @ApiOkResponse({ type: GeneralResponse })
  async findAll(@Res() response: any) {
    const lista = await this.service.findAll();
    const respuesta: GeneralResponse = {
      data: {
        type: 'tipo-adquisicion',
        attributes: { mensaje: 'Lista cargada', contenido: lista }
      }
    };
    return response.status(HttpStatus.OK).json(respuesta);
  }
}