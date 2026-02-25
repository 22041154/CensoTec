import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CensoApiService } from '../../services/censo-api'; 

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resumen.html',
  styleUrls: ['./resumen.css']
})
export class Resumen implements OnInit {
  private censoService = inject(CensoApiService);
  private router = inject(Router);

  datos: any = null;
  cargando = true;
  fechaImpresion = new Date();
  
  // Control de modo edición global
  modoEdicion = false;
  guardando = false;
  mensajeExito = '';

  // Catálogos para Sección 3
  catalogos = {
    medios: [] as any[],
    velocidades: [] as any[]
  };

  // Datos seleccionados en edición de Sección 3
  mediosSeleccionados: { [key: number]: boolean } = {};
  velocidadesSeleccionadas: { [key: number]: boolean } = {};

  ngOnInit() {
    const id = localStorage.getItem('id_censo_actual');
    
    if (id) {
      this.censoService.obtenerDatosEscuela(+id).subscribe({
        next: (res: any) => { 
          this.datos = res;
          this.inicializarSelecciones();
          this.cargando = false;
        },
        error: (e: any) => {
          console.error('Error cargando resumen:', e);
          this.cargando = false;
        }
      });
      this.cargarCatalogos();
    } else {
      this.router.navigate(['/']);
    }
  }

  cargarCatalogos() {
    this.censoService.obtenerCatalogosPaso4().subscribe({
      next: (res: any) => {
        this.catalogos.medios = res.medios || [];
        this.catalogos.velocidades = res.velocidades || [];
      },
      error: (e) => console.error('Error cargando catálogos:', e)
    });
  }

  inicializarSelecciones() {
    // Inicializa los checkboxes con los valores actuales
    if (this.datos?.mediosConexionSeleccionados) {
      this.datos.mediosConexionSeleccionados.forEach((m: any) => {
        this.mediosSeleccionados[m.id] = true;
      });
    }
    if (this.datos?.velocidadesInternetSeleccionadas) {
      this.datos.velocidadesInternetSeleccionadas.forEach((v: any) => {
        this.velocidadesSeleccionadas[v.id] = true;
      });
    }
  }

  imprimir() {
    window.print();
  }

  finalizar() {
    if(confirm('¿Desea cerrar la sesión del censo?')) {
        localStorage.removeItem('id_censo_actual');
        this.router.navigate(['/']);
    }
  }

  // Funciones de edición
  activarEdicionGlobal() {
    this.modoEdicion = true;
    this.mediosSeleccionados = {};
    this.velocidadesSeleccionadas = {};
    this.inicializarSelecciones();
  }

  cancelarEdicion() {
    this.modoEdicion = false;
    this.cargarDatos();
  }

  guardarSeccion() {
    const id = localStorage.getItem('id_censo_actual');
    if (!id) return;

    this.guardando = true;
    const datosActualizados = this.prepararDatosParaGuardar();

    this.censoService.actualizarDatos(+id, datosActualizados).subscribe({
      next: (res: any) => {
        this.guardando = false;
        this.mensajeExito = '✓ Datos actualizados correctamente';
        // Recargar datos después de guardar
        this.cargarDatos();
        setTimeout(() => {
          this.mensajeExito = '';
          this.modoEdicion = false;
        }, 2000);
      },
      error: (e: any) => {
        this.guardando = false;
        console.error('Error al guardar:', e);
        alert('Error al guardar los cambios. Intenta nuevamente.');
      }
    });
  }

  private prepararDatosParaGuardar(): any {
    // Retorna solo los campos que han sido modificados
    const datos: any = {
      operativas: this.datos.operativas,
      reparacion: this.datos.reparacion,
      reserva: this.datos.reserva,
      uso_educativo: this.datos.uso_educativo,
      uso_docente: this.datos.uso_docente,
      uso_administrativo: this.datos.uso_administrativo,
      internet_educativo: this.datos.internet_educativo,
      internet_docente: this.datos.internet_docente,
      internet_administrativo: this.datos.internet_administrativo,
      tiene_impresora_estudiantes: this.datos.tiene_impresora_estudiantes,
      impresiones_gratuitas: this.datos.impresiones_gratuitas,
      tiene_servidores: this.datos.tiene_servidores,
      cantidad_servidores: this.datos.cantidad_servidores,
      tiene_wifi_publico: this.datos.tiene_wifi_publico,
      // Enviar medios y velocidades seleccionados
      mediosConexionSeleccionados: this.catalogos.medios
        .filter(m => this.mediosSeleccionados[m.id])
        .map(m => ({ id: m.id, medio: m.medio })),
      velocidadesInternetSeleccionadas: this.catalogos.velocidades
        .filter(v => this.velocidadesSeleccionadas[v.id])
        .map(v => ({ id: v.id, rango: v.rango }))
    };

    console.log('Datos a guardar:', datos);
    return datos;
  }

  private cargarDatos() {
    const id = localStorage.getItem('id_censo_actual');
    if (id) {
      this.censoService.obtenerDatosEscuela(+id).subscribe({
        next: (res: any) => { 
          this.datos = res;
          // Reinicializar selecciones después de cargar nuevos datos
          this.mediosSeleccionados = {};
          this.velocidadesSeleccionadas = {};
          this.inicializarSelecciones();
        },
        error: (e: any) => {
          console.error('Error cargando datos:', e);
        }
      });
    }
  }
}