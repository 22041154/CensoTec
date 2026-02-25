import { ApiProperty } from '@nestjs/swagger';


export class AttributesText {
  @ApiProperty()
  mensaje: string;

  @ApiProperty()
  contenido?: any;
}

export class DataObj {
  @ApiProperty()
  type: string;

  @ApiProperty({ type: AttributesText })
  attributes: AttributesText;
}

export class GeneralResponse {
  @ApiProperty({ type: DataObj })
  data: DataObj;
}