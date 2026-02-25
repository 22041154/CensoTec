import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CensoApiService } from '../../../services/censo-api'; 

@Component({
  selector: 'app-conexion-internet',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './conexion-internet.html',
  styleUrls: ['./conexion-internet.css']
})
export class ConexionInternetComponent implements OnInit {
  
  private censoService = inject(CensoApiService);
  private router = inject(Router);

  idActual: number | null = null;

  errores: any = {
    uso_educativo: false,
    uso_docente: false,
    uso_administrativo: false,
    internet_educativo: false,
    internet_docente: false,
    internet_administrativo: false
  };

  datos: any = {
    uso_educativo: null,
    uso_docente: null,
    uso_administrativo: null,
    internet_educativo: null,
    internet_docente: null,
    internet_administrativo: null
  };

  ngOnInit() {
    const idGuardado = localStorage.getItem('id_censo_actual');
    
    if (idGuardado) {
      this.idActual = Number(idGuardado);
      console.log(' Editando registro ID:', this.idActual);
      
      this.censoService.obtenerDatosEscuela(this.idActual).subscribe(res => {
        if (res) {
          this.datos = {
            uso_educativo: res.uso_educativo || null,
            uso_docente: res.uso_docente || null,
            uso_administrativo: res.uso_administrativo || null,
            internet_educativo: res.internet_educativo || null,
            internet_docente: res.internet_docente || null,
            internet_administrativo: res.internet_administrativo || null
          };
        }
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  get totalUso() {
    return (this.datos.uso_educativo || 0) + 
           (this.datos.uso_docente || 0) + 
           (this.datos.uso_administrativo || 0);
  }

  get totalInternet() {
    return (this.datos.internet_educativo || 0) + 
           (this.datos.internet_docente || 0) + 
           (this.datos.internet_administrativo || 0);
  }

  guardar() {
    if (!this.idActual) return;

    // 1. Reiniciamos el estado de errores
    Object.keys(this.errores).forEach(key => this.errores[key] = false);

    // 2. Validamos campos vacíos (null o undefined)
    let tieneErrores = false;
    Object.keys(this.datos).forEach(key => {
      if (this.datos[key] === null || this.datos[key] === undefined) {
        this.errores[key] = true;
        tieneErrores = true;
      }
    });

    // Si hay errores, no avanzamos. Los mensajes aparecerán en el HTML.
    if (tieneErrores) {
      return; 
    }

    // 3. Validación de lógica de negocio
    if ((this.datos.internet_educativo || 0) > (this.datos.uso_educativo || 0)) {
      alert('Error: No puedes tener más equipos con internet que equipos totales.');
      return;
    }

    const datosParaEnviar = {
      uso_educativo: this.datos.uso_educativo || 0,
      uso_docente: this.datos.uso_docente || 0,
      uso_administrativo: this.datos.uso_administrativo || 0,
      internet_educativo: this.datos.internet_educativo || 0,
      internet_docente: this.datos.internet_docente || 0,
      internet_administrativo: this.datos.internet_administrativo || 0,
      total_uso: this.totalUso,
      total_internet: this.totalInternet
    };

    this.censoService.actualizarDatos(this.idActual, datosParaEnviar).subscribe({
      next: () => {
        this.router.navigate(['/detalle-educativo']); 
      },
      error: (e) => {
        console.error(e);
        alert('Error al actualizar. Revisa la consola.');
      }
    });
  }
}