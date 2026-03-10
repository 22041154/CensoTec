import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatosEscuela } from '../entities/DatosEscuela.entity';
import { ConteoAdquisicion } from '../entities/conteo-adquisicion.entity';
import { ConteoMemoriaRam } from '../entities/conteo-memoria-ram.entity';
import { ConteoSistemaOperativo } from '../entities/conteo-sistema-operativo.entity';
import { ConteoCapacidadDisco } from '../entities/conteo-capacidad-disco.entity';
import { ConteoAntiguedad } from '../entities/conteo-antiguedad.entity';
import { ConteoTipoComputadora } from '../entities/conteo-tipo-computadora.entity';

@Injectable()
export class DatosEscuelaService {
  constructor(
    @InjectRepository(DatosEscuela)
    private repo: Repository<DatosEscuela>,
    @InjectRepository(ConteoAdquisicion)
    private conteoAdquisicionRepo: Repository<ConteoAdquisicion>,
    @InjectRepository(ConteoMemoriaRam)
    private conteoRamRepo: Repository<ConteoMemoriaRam>,
    @InjectRepository(ConteoSistemaOperativo)
    private conteoSORepo: Repository<ConteoSistemaOperativo>,
    @InjectRepository(ConteoCapacidadDisco)
    private conteoDisco: Repository<ConteoCapacidadDisco>,
    @InjectRepository(ConteoAntiguedad)
    private conteoAntiguedadRepo: Repository<ConteoAntiguedad>,
    @InjectRepository(ConteoTipoComputadora)
    private conteoTipoRepo: Repository<ConteoTipoComputadora>,
  ) {}

  async guardar(data: any, usuarioId: number) {
    const existe = await this.repo.findOne({ where: { usuarioId: usuarioId } });
    
    if (existe) {
      await this.repo.update(existe.iddatos, data);
      return { iddatos: existe.iddatos, ...data }; 
    } else {
      const nuevo = this.repo.create({ ...data, usuarioId: usuarioId });
      return await this.repo.save(nuevo);
    }
  }

  async actualizar(id: number, datos: any) {
    try {
      // Extraer las relaciones OneToMany del paso 3
      const conteosTipo = datos.conteosTipo;
      const conteosRam = datos.conteosRam;
      const conteosSO = datos.conteosSO;
      const conteosDisco = datos.conteosDisco;
      const conteosAntiguedad = datos.conteosAntiguedad;
      
      // Relaciones de pasos posteriores
      const medios = datos.mediosConexionSeleccionados;
      const velocidades = datos.velocidadesInternetSeleccionadas;
      const perfiles = datos.perfilesWifiSeleccionados;
      const conteosAdquisicion = datos.conteosAdquisicion;
      
      // Separar datos normales de relaciones
      const datosSimples = { ...datos };
      delete datosSimples.conteosTipo;
      delete datosSimples.conteosRam;
      delete datosSimples.conteosSO;
      delete datosSimples.conteosDisco;
      delete datosSimples.conteosAntiguedad;
      delete datosSimples.mediosConexionSeleccionados;
      delete datosSimples.velocidadesInternetSeleccionadas;
      delete datosSimples.perfilesWifiSeleccionados;
      delete datosSimples.conteosAdquisicion;

      // Actualizar datos simples
      await this.repo.update(id, datosSimples);

      // Obtener el registro actualizado
      const registro = await this.repo.findOne({ 
        where: { iddatos: id }
      });

      if (!registro) {
        throw new Error(`Registro con ID ${id} no encontrado`);
      }

      // Actualizar conteosTipo (Paso 3)
      if (conteosTipo && Array.isArray(conteosTipo) && conteosTipo.length > 0) {
        await this.conteoTipoRepo.delete({ censo: { iddatos: id } });
        const nuevosConteos = conteosTipo.map(conteo => ({
          cantidad: conteo.cantidad,
          censo: { iddatos: id },
          tipoComputadora: { idtipocomputadora: conteo.tipoComputadora.idtipocomputadora }
        }));
        await this.conteoTipoRepo.insert(nuevosConteos);
      }

      // Actualizar conteosRam (Paso 3)
      if (conteosRam && Array.isArray(conteosRam) && conteosRam.length > 0) {
        await this.conteoRamRepo.delete({ censo: { iddatos: id } });
        const nuevosConteos = conteosRam.map(conteo => ({
          cantidad: conteo.cantidad,
          censo: { iddatos: id },
          memoriaRam: { idram: conteo.memoriaRam.idram }
        }));
        await this.conteoRamRepo.insert(nuevosConteos);
      }

      // Actualizar conteosSO (Paso 3)
      if (conteosSO && Array.isArray(conteosSO) && conteosSO.length > 0) {
        await this.conteoSORepo.delete({ censo: { iddatos: id } });
        const nuevosConteos = conteosSO.map(conteo => ({
          cantidad: conteo.cantidad,
          censo: { iddatos: id },
          sistemaOperativo: { idsistema: conteo.sistemaOperativo.idsistema }
        }));
        await this.conteoSORepo.insert(nuevosConteos);
      }

      // Actualizar conteosDisco (Paso 3)
      if (conteosDisco && Array.isArray(conteosDisco) && conteosDisco.length > 0) {
        await this.conteoDisco.delete({ censo: { iddatos: id } });
        const nuevosConteos = conteosDisco.map(conteo => ({
          cantidad: conteo.cantidad,
          censo: { iddatos: id },
          capacidadDisco: { idcapacidad: conteo.capacidadDisco.idcapacidad }
        }));
        await this.conteoDisco.insert(nuevosConteos);
      }

      // Actualizar conteosAntiguedad (Paso 3)
      if (conteosAntiguedad && Array.isArray(conteosAntiguedad) && conteosAntiguedad.length > 0) {
        await this.conteoAntiguedadRepo.delete({ censo: { iddatos: id } });
        const nuevosConteos = conteosAntiguedad.map(conteo => ({
          cantidad: conteo.cantidad,
          censo: { iddatos: id },
          antiguedad: { idantiguedad: conteo.antiguedad.idantiguedad }
        }));
        await this.conteoAntiguedadRepo.insert(nuevosConteos);
      }

      // Actualizar medios, velocidades y perfiles si existen
      if (medios || velocidades || perfiles) {
        const registroActualizado = await this.repo.findOne({ 
          where: { iddatos: id },
          relations: ['mediosConexionSeleccionados', 'velocidadesInternetSeleccionadas', 'perfilesWifiSeleccionados']
        });

        if (registroActualizado) {
          if (medios) {
            registroActualizado.mediosConexionSeleccionados = medios;
          }
          if (velocidades) {
            registroActualizado.velocidadesInternetSeleccionadas = velocidades;
          }
          if (perfiles) {
            registroActualizado.perfilesWifiSeleccionados = perfiles;
          }
          await this.repo.save(registroActualizado);
        }
      }
      
      // Actualizar conteosAdquisicion
      if (conteosAdquisicion && Array.isArray(conteosAdquisicion) && conteosAdquisicion.length > 0) {
        await this.conteoAdquisicionRepo.delete({ datosEscuela: { iddatos: id } });
        
        const nuevosConteos = conteosAdquisicion.map(conteo => ({
          cantidad: conteo.cantidad,
          datosEscuela: { iddatos: id },
          tipoAdquisicion: { id: conteo.tipoAdquisicion.id }
        }));
        
        await this.conteoAdquisicionRepo.insert(nuevosConteos);
      }

      // Retornar el registro actualizado
      return await this.findOne(id);
    } catch (error) {
      console.error('Error en actualizar:', error);
      throw error;
    }
  }

  async buscarPorUsuario(usuarioId: number) {
    return await this.repo
      .createQueryBuilder('datos')
      .leftJoinAndSelect('datos.conteosRam', 'conteosRam')
      .leftJoinAndSelect('datos.conteosSO', 'conteosSO')
      .leftJoinAndSelect('datos.conteosDisco', 'conteosDisco')
      .leftJoinAndSelect('datos.conteosAntiguedad', 'conteosAntiguedad')
      .leftJoinAndSelect('datos.conteosTipo', 'conteosTipo')
      .leftJoinAndSelect('datos.conteosAdquisicion', 'conteosAdquisicion')
      .leftJoinAndSelect('conteosAdquisicion.tipoAdquisicion', 'tipoAdquisicion')
      .leftJoinAndSelect('datos.mediosConexionSeleccionados', 'mediosConexionSeleccionados')
      .leftJoinAndSelect('datos.velocidadesInternetSeleccionadas', 'velocidadesInternetSeleccionadas')
      .leftJoinAndSelect('datos.perfilesWifiSeleccionados', 'perfilesWifiSeleccionados')
      .where('datos.usuarioId = :usuarioId', { usuarioId })
      .getOne();
  }

  async findOne(id: number) {
    return await this.repo
      .createQueryBuilder('datos')
      .leftJoinAndSelect('datos.conteosRam', 'conteosRam')
      .leftJoinAndSelect('datos.conteosSO', 'conteosSO')
      .leftJoinAndSelect('datos.conteosDisco', 'conteosDisco')
      .leftJoinAndSelect('datos.conteosAntiguedad', 'conteosAntiguedad')
      .leftJoinAndSelect('datos.conteosTipo', 'conteosTipo')
      .leftJoinAndSelect('datos.conteosAdquisicion', 'conteosAdquisicion')
      .leftJoinAndSelect('conteosAdquisicion.tipoAdquisicion', 'tipoAdquisicion')
      .leftJoinAndSelect('datos.mediosConexionSeleccionados', 'mediosConexionSeleccionados')
      .leftJoinAndSelect('datos.velocidadesInternetSeleccionadas', 'velocidadesInternetSeleccionadas')
      .leftJoinAndSelect('datos.perfilesWifiSeleccionados', 'perfilesWifiSeleccionados')
      .where('datos.iddatos = :id', { id })
      .getOne();
  }

  // src/datos-escuela/datos-escuela.service.ts

async obtenerDepartamentosDisponibles() {
  // 1. Definimos la nueva lista estructurada con encabezados
  const todosLosDepartamentos = [
    '-- Departamentos Académicos --',
    'Sistemas y Computación',
    'Ciencias Económico-Administrativo',
    'Metal-Mecánica',
    'Química-Bioquímica',
    'Ciencias Básicas',
    'Ciencias de la Tierra',
    'Eléctrica Electrónica',
    'Ingeniería Industrial',
    '-- Departamentos Administrativos --',
    'Centro de Computo',
    'Recursos Financieros',
    'Recursos Humanos',
    'Recursos Materiales y Servicios',
    'Mantenimiento y Equipo',
    '-- Departamentos de Planeación y Vinculación --',
    'Departamento de Comunicación y Difusión',
    'Departamento de Gestión Tecnológica y Vinculación',
    'Departamento de Servicios Escolares',
    'Departamento de Planeación, Programación y Presupuestación',
    'Centro de Información',
    'Departamento de Actividades Extraescolares'
  ];

  // 2. Consultamos qué departamentos ya tienen un censo registrado
  const departamentosEnUso = await this.repo
    .createQueryBuilder('datos')
    .select('DISTINCT datos.departamento', 'departamento')
    .where('datos.departamento IS NOT NULL')
    .getRawMany();

  const departamentosEnUsoNombres = departamentosEnUso.map(d => d.departamento);

  const departamentosDisponibles = todosLosDepartamentos.filter(depto => {
    if (depto.startsWith('--')) return true; 
    return !departamentosEnUsoNombres.includes(depto); 
  });

  return departamentosDisponibles;
}

}