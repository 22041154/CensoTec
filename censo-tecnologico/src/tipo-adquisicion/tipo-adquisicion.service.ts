import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoAdquisicion } from '../entities/tipo-adquisicion.entity';

@Injectable()
export class TipoAdquisicionService implements OnModuleInit {
  constructor(@InjectRepository(TipoAdquisicion) private repo: Repository<TipoAdquisicion>) {}

  async onModuleInit() {
    if (await this.repo.count() === 0) {
      await this.repo.save([
        { tipo: 'Rentada' },
        { tipo: 'Comprada' },
        { tipo: 'Préstamo' },
        { tipo: 'Donada' }
      ]);
    }
  }

  async findAll() { return await this.repo.find(); }
}