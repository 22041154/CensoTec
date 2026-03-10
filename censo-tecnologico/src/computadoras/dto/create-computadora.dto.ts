import { ApiProperty } from '@nestjs/swagger';

export class CreateComputadoraDto {
  @ApiProperty({ example: 'Lenovo ThinkCentre', description: 'Marca o modelo del equipo' })
  nombreEquipo: string;

  @ApiProperty({ example: 1, description: 'ID de la Memoria RAM seleccionada' })
  memoriaRamId: number;

  @ApiProperty({ example: 2, description: 'ID del Sistema Operativo seleccionado' })
  sistemaOperativoId: number;

  @ApiProperty({ example: 1, description: 'ID de la Capacidad de Disco' })
  discoId: number;

  @ApiProperty({ example: 3, description: 'ID del Tipo de Computadora (Escritorio, etc)' })
  tipoId: number;
  
  @ApiProperty({ example: 2, description: 'ID de la Antigüedad' })
  antiguedadId: number;
}