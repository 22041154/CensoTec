import { Injectable, OnModuleInit } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SistemasOperativos } from 'src/entities/SistemasOperativos.entity'; 

@Injectable()
export class SistemasOperativosService implements OnModuleInit { 
  
  constructor(
    @InjectRepository(SistemasOperativos)
    private repo: Repository<SistemasOperativos>,
  ) {}
  async onModuleInit() {
    const total = await this.repo.count();

    if (total === 0) {
      await this.repo.save([
        { nombresistema: 'Windows' },
        { nombresistema: 'macOS' },
        { nombresistema: 'Linux u otros' }
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