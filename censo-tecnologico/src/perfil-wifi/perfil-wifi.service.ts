import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerfilWifi } from '../entities/perfil-wifi.entity';

@Injectable()
export class PerfilWifiService implements OnModuleInit {
  constructor(@InjectRepository(PerfilWifi) private repo: Repository<PerfilWifi>) {}

  async onModuleInit() {
    if (await this.repo.count() === 0) {
      await this.repo.save([
        { perfil: 'Alumnos y alumnas' },
        { perfil: 'Docentes' },
        { perfil: 'Administrativos' }
      ]);
    }
  }

  async findAll() { return await this.repo.find(); }
}