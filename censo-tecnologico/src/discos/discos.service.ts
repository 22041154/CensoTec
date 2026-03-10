import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CapacidadesDisco } from '../entities/capacidades_disco.entity';

@Injectable()
export class DiscosService implements OnModuleInit { 
  
  constructor(
    @InjectRepository(CapacidadesDisco)
    private repo: Repository<CapacidadesDisco>,
  ) {}
  async onModuleInit() {
    const total = await this.repo.count();

    if (total === 0) {
      await this.repo.save([
        { capacidad: '128 GB o menos' },
        { capacidad: '129 GB a 500 GB' },
        { capacidad: 'Más de 500 GB' }
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