import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';

@Controller('servicios')
export class ServiciosController {

    @Get()
            async get(@Res() response){
                return response.status(HttpStatus.OK).json(
                    {mensaje: 'lista de servicios'}
                )
            }
        
            @Get(':x')
            async GetX(@Param('x') x: string, @Res() response){
                return response.status(HttpStatus.OK).json(
                    {mensaje: 'Detalle del servicio'+x} );
            }
        
            @Post()
            async Post(@Body() request: string, @Res() response){
                return response.status(HttpStatus.CREATED).json(    
                    request);
                
            }

}
