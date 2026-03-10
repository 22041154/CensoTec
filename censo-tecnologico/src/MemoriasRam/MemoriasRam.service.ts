import { Injectable, OnModuleInit } from '@nestjs/common'; // 1. Importamos OnModuleInit
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemoriasRam } from '../entities/MemoriasRam.entity';

@Injectable()
export class MemoriasRamService implements OnModuleInit { // 2. Implementamos la interfaz
  
  constructor(
    @InjectRepository(MemoriasRam)
    private repo: Repository<MemoriasRam>,
  ) {}

  async onModuleInit() {
    const cuenta = await this.repo.count();

    if (cuenta === 0) {
      await this.repo.save([
        { ram: '1 GB a menos de 4 GB' },
        { ram: '4 GB a 16 GB' },
        { ram: '16 GB o más' }
      ]);
    }
  }

  // Tus métodos normales
  async insert(data: any) {
    return await this.repo.save(data);
  }

  async findAll() {
    return await this.repo.find();
  }
}