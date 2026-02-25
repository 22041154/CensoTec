import { Injectable, OnModuleInit } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Antiguedades } from '../entities/antiguedades.entity';

@Injectable()
export class AntiguedadesService implements OnModuleInit { 
  
  constructor(
    @InjectRepository(Antiguedades)
    private repo: Repository<Antiguedades>,
  ) {}
  async onModuleInit() {
    const total = await this.repo.count();

    if (total === 0) {
      await this.repo.save([
        { antiguedad: '2 años o menos' },
        { antiguedad: '3 a 4 años' },
        { antiguedad: '5 años o más' }
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