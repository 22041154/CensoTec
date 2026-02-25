import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Computadoras } from '../entities/computadoras.entity';
import { CreateComputadoraDto } from './dto/create-computadora.dto';

@Injectable()
export class ComputadorasService {
  
  constructor(
    @InjectRepository(Computadoras)
    private repo: Repository<Computadoras>,
  ) {}

  async findAll() {
    return await this.repo.find({
      relations: ['memoriaRam', 'sistemaOperativo', 'disco', 'tipo', 'antiguedad'] 
    });
  }

  async findOne(id: number) {
    return await this.repo.findOne({
      where: { idcomputadora: id }, 
      relations: ['memoriaRam', 'sistemaOperativo', 'disco', 'tipo', 'antiguedad']
    });
  }

  async create(datos: CreateComputadoraDto) {

    const nuevaComputadora = this.repo.create({
      nombreEquipo: datos.nombreEquipo,
      memoriaRam: { idram: datos.memoriaRamId },
      sistemaOperativo: { idsistema: datos.sistemaOperativoId },
      disco: { idcapacidad: datos.discoId },
      tipo: { idtipocomputadora: datos.tipoId },
      antiguedad: { idantiguedad: datos.antiguedadId }
    } as any); 

    return await this.repo.save(nuevaComputadora);
  }
}