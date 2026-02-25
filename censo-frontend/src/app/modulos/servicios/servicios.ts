import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CensoApiService } from '../../services/censo-api'; 

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servicios.html',
  styleUrls: ['./servicios.css']
})
export class ServiciosComponent implements OnInit {

  private censoService = inject(CensoApiService);
  private router = inject(Router);
  idActual: number | null = null;

  perfilesWifi: any[] = [];

  datos = {
    tieneImpresora: false,
    impresionesGratuitas: false,
    
    tieneWifiPublico: false,
    perfilesSeleccionados: {} as any, 
    
    tieneServidores: false,
    cantidadServidores: 0
  };

  ngOnInit() {
    const id = localStorage.getItem('id_censo_actual');
    if (id) {
      this.idActual = +id;
      this.cargarCatalogo();
    } else {
      this.router.navigate(['/']);
    }
  }

  cargarCatalogo() {
    this.censoService.obtenerCatalogosPaso5().subscribe({
      next: (data) => this.perfilesWifi = data || [],
      error: (e) => console.error(e)
    });
  }

  guardar() {
    if (!this.idActual) return;

    if (this.datos.tieneServidores && this.datos.cantidadServidores <= 0) {
      alert(' Si tiene servidores, la cantidad debe ser mayor a 0.');
      return;
    }

    const payload = {
      tiene_impresora_estudiantes: this.datos.tieneImpresora,
      impresiones_gratuitas: this.datos.tieneImpresora ? this.datos.impresionesGratuitas : false, 

      tiene_wifi_publico: this.datos.tieneWifiPublico,
      perfilesWifiSeleccionados: this.datos.tieneWifiPublico 
        ? this.perfilesWifi
            .filter(p => this.datos.perfilesSeleccionados[p.id])
            .map(p => ({ id: p.id }))
        : [], 

      tiene_servidores: this.datos.tieneServidores,
      cantidad_servidores: this.datos.tieneServidores ? this.datos.cantidadServidores : 0
    };

    console.log('Enviando Paso 5:', payload);

    this.censoService.actualizarDatos(this.idActual, payload).subscribe({
      next: () => {
        this.router.navigate(['/resumen']);
      },
      error: (e) => alert(' Error al guardar.')
    });
  }
}