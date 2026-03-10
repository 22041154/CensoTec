import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedioConexion } from '../entities/medio-conexion.entity';

@Injectable()
export class MedioConexionService implements OnModuleInit {
  constructor(@InjectRepository(MedioConexion) private repo: Repository<MedioConexion>) {}

  async onModuleInit() {
    if (await this.repo.count() === 0) {
      await this.repo.save([
        { medio: 'Red dedicada' },
        { medio: 'Internet por cable' },
        { medio: 'Vía satélite' },
        { medio: 'Señal abierta Wi-Fi' },
        { medio: 'Línea telefónica' },
        { medio: 'No sabe' },
        { medio: 'Otro medio' }
      ]);
    }
  }

  async findAll() { return await this.repo.find(); }
}