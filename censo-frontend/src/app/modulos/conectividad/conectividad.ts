import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CensoApiService } from '../../services/censo-api';

@Component({
  selector: 'app-conectividad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conectividad.html',
  styleUrls: ['./conectividad.css']
})
export class Conectividad implements OnInit {

  private censoService = inject(CensoApiService);
  private router = inject(Router);
  idActual: number | null = null;

  catalogos = {
    adquisiciones: [] as any[],
    medios: [] as any[],
    velocidades: [] as any[]
  };

  datos = {
    adquisicion: {} as any, 
    totalAdquisicion: 0,
    conInternet: 0,
    sinInternet: 0,
    mediosSeleccionados: {} as any,
    velocidadesSeleccionadas: {} as any
  };

  ngOnInit() {
    const id = localStorage.getItem('id_censo_actual');
    if (id) {
      this.idActual = +id;
      this.cargarCatalogos();
    } else {
      this.router.navigate(['/']);
    }
  }

  cargarCatalogos() {
    this.censoService.obtenerCatalogosPaso4().subscribe({
      next: (res: any) => {
        this.catalogos.adquisiciones = res.adquisiciones || [];
        this.catalogos.medios = res.medios || [];
        this.catalogos.velocidades = res.velocidades || [];
        
        // Inicializar adquisición
        this.catalogos.adquisiciones.forEach(a => this.datos.adquisicion[a.id] = 0);
      },
      error: (e) => console.error('Error cargando catálogos P4', e)
    });
  }

  calcularTotalAdquisicion() {
    let suma = 0;
    Object.values(this.datos.adquisicion).forEach((val: any) => suma += Number(val || 0));
    this.datos.totalAdquisicion = suma;
  }

  guardar() {
    if (!this.idActual) return;

    if (this.datos.totalAdquisicion === 0) {
        if(!confirm('¿Seguro que el total de equipos es 0?')) return;
    }

    const payload = {
      // 1. Adquisición
      conteosAdquisicion: this.catalogos.adquisiciones
        .filter(item => this.datos.adquisicion[item.id] > 0)
        .map(item => ({
            tipoAdquisicion: { id: item.id },
            cantidad: this.datos.adquisicion[item.id]
        })),

      // 2. Red 
      computadorasConInternet: this.datos.conInternet,
      computadorasSinInternet: this.datos.sinInternet,

      // 3. Checkboxes (Medios y Velocidades)
      mediosConexionSeleccionados: this.catalogos.medios
        .filter(m => this.datos.mediosSeleccionados[m.id])
        .map(m => ({ id: m.id })),

      velocidadesInternetSeleccionadas: this.catalogos.velocidades
        .filter(v => this.datos.velocidadesSeleccionadas[v.id])
        .map(v => ({ id: v.id }))
    };

    this.censoService.actualizarDatos(this.idActual, payload).subscribe({
      next: () => {
        this.router.navigate(['/servicios']);
      },
      error: (e) => console.error('Error guardando Paso 4', e)
    });
  }
}