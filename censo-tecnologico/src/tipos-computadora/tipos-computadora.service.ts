import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TiposComputadora } from 'src/entities/tipos-computadora.entity';

@Injectable()
export class TiposComputadoraService implements OnModuleInit {
  
  constructor(
    @InjectRepository(TiposComputadora)
    private repo: Repository<TiposComputadora>,
  ) {}
  async onModuleInit() {
    const total = await this.repo.count();

    if (total === 0) {
      await this.repo.save([
        { tipo: 'Escritorio' },
        { tipo: 'Portátil' },
        { tipo: 'Terminal' }
      ]);
    }
  }

  async insert(data: any) {
    return await this.repo.save(data);
  }

  async findAll() {
    return await this.repo.find();
  }
}