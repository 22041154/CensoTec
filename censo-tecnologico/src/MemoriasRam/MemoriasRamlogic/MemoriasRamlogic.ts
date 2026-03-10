import { Injectable } from "@nestjs/common";
import { Attributestext } from "src/POCOS/DTO/responses/attributestext.interface";
import { Mensajesdata } from "src/POCOS/DTO/responses/data/mensajesdata.interface";
import { Mensajesresponse } from "src/POCOS/DTO/responses/mensajesresponse.interface";

@Injectable()
export class MemoriasRamlogic {
    constructor(){}

    async GetMemoriasRam(id:string): Promise<Mensajesresponse> {
        let _mensaje= '';
            if(id.length == 1){
                _mensaje = "no existen los datos";

            }
            else
                _mensaje = "lista de computados";
            let _attributes: Attributestext = {mensaje: _mensaje };
            
            let _data: Mensajesdata = {
                attributes: _attributes,
                type: 'computadoras'
            };
            let response: Mensajesresponse = { data: _data};

            return response;

        }

        
    }
