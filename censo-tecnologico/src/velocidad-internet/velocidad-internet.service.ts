import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VelocidadInternet } from '../entities/velocidad-internet.entity';

@Injectable()
export class VelocidadInternetService implements OnModuleInit {
  constructor(@InjectRepository(VelocidadInternet) private repo: Repository<VelocidadInternet>) {}

  async onModuleInit() {
    if (await this.repo.count() === 0) {
      await this.repo.save([
        { rango: 'Menos de 6 mb' },
        { rango: 'De 6 a 10 mb' },
        { rango: 'De 11 a 25 mb' },
        { rango: 'De 26 a 100 mb' },
        { rango: 'Más de 100 mb' }
      ]);
    }
  }

  async findAll() { return await this.repo.find(); }
}