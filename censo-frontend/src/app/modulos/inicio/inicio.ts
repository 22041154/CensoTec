import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CensoApiService } from '../../services/censo-api'; 
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule], // Añade FormsModule aquí
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class Inicio implements OnInit {
  private router = inject(Router);
  private censoService = inject(CensoApiService);
  private authService = inject(AuthService);

  cargando = true;
  cargandoBtn = false;
  nombrePaso = 'Cargando...';
  rutaDestino = '/paso1';
  datosGuardados: any = null;

  // NUEVAS VARIABLES
  departamentoSeleccionado: string = '';
  departamentoInicialGuardado: string = '';
  departamentoBloqueado: boolean = false;
  tempDepartamento: string | null = null;
  departamentos: string[] = [];

  ngOnInit() {
    this.cargarDepartamentosDisponibles();
    this.verificarProgreso();
    const tempDept = localStorage.getItem('temp_departamento');
    const tieneCenso = !!localStorage.getItem('id_censo_actual');

    if (tempDept && tieneCenso) {
      this.departamentoSeleccionado = tempDept;
      this.tempDepartamento = tempDept;
      this.departamentoInicialGuardado = tempDept;
    }
  }

  cargarDepartamentosDisponibles() {
    this.censoService.obtenerDepartamentosDisponibles().subscribe({
      next: (departamentos) => {
        // Si el usuario ya tiene un departamento seleccionado, incluirlo en la lista
        if (this.departamentoSeleccionado && !departamentos.includes(this.departamentoSeleccionado)) {
          this.departamentos = [this.departamentoSeleccionado, ...departamentos].sort();
        } else {
          this.departamentos = departamentos;
        }
      },
      error: (err) => {
        console.error('Error obteniendo departamentos disponibles', err);
        // En caso de error, asignar todos los departamentos como fallback
        this.departamentos = [
          'Sistemas y Computación',
          'Ingeniería Industrial',
          'Ciencias Económico-Administrativas',
          'Ingeniería Eléctrica y Electrónica',
          'Ingeniería Mecánica',
          'Ciencias Básicas'
        ];
      }
    });
  }

  verificarProgreso() {
    this.censoService.obtenerMiProgreso().subscribe({
      next: (censo) => {
        this.cargando = false;
        if (censo) {
          this.datosGuardados = censo;
          if (censo.departamento) {
            this.departamentoSeleccionado = censo.departamento;
            this.departamentoInicialGuardado = censo.departamento;
            // Si el censo ya tiene departamento guardado en servidor, bloquear selección
            this.departamentoBloqueado = true;
            // Asegurar que este departamento esté en la lista de opciones
            if (!this.departamentos.includes(censo.departamento)) {
              this.departamentos = [censo.departamento, ...this.departamentos].sort();
            }
          }
          
          localStorage.setItem('id_censo_actual', censo.iddatos.toString());
          const paso = this.calcularPasoFaltante(censo);
          this.nombrePaso = paso.nombre;
          this.rutaDestino = paso.ruta;
        } else {
          this.nombrePaso = 'Nuevo Censo (Paso 1)';
          this.rutaDestino = '/paso1';
        }
      },
      error: (e) => {
        this.cargando = false;
        console.error('Error obteniendo progreso', e);
      }
    });
  }

  continuar() {
    if (!this.departamentoSeleccionado) {
      alert('Por favor selecciona un departamento.');
      return;
    }

    // Bloquear el botón mientras se procesa
    this.cargandoBtn = true;

    
    if (this.datosGuardados && !this.datosGuardados.departamento) {
      // Hay censo en progreso pero sin departamento. Guardarlo en el servidor
      this.censoService.actualizarDatos(this.datosGuardados.iddatos, { 
        departamento: this.departamentoSeleccionado 
      }).subscribe({
        next: () => {
          // marcar como bloqueado para que no puedan cambiarlo después
          this.datosGuardados.departamento = this.departamentoSeleccionado;
          this.departamentoInicialGuardado = this.departamentoSeleccionado;
          this.departamentoBloqueado = true;
          localStorage.removeItem('temp_departamento');
          this.router.navigate([this.rutaDestino]);
        },
        error: (err) => {
          console.error('Error al guardar departamento', err);
          this.cargandoBtn = false;
        }
      });
    } 
   
    else if (!this.datosGuardados) {
      // Nuevo censo: guardar el departamento en localStorage y bloquear
      localStorage.setItem('temp_departamento', this.departamentoSeleccionado);
      this.tempDepartamento = this.departamentoSeleccionado;
      this.departamentoBloqueado = true;
      this.departamentoInicialGuardado = this.departamentoSeleccionado;
      this.router.navigate([this.rutaDestino]);
    }
    
    else {
      // Ya tiene departamento guardado, solo navegar
      this.router.navigate([this.rutaDestino]);
    }
  }

  onDepartamentoChange() {
    // El cambio de departamento se detecta en el template
  }

  cerrarSesion() { this.authService.logout(); }

  calcularPasoFaltante(datos: any): { nombre: string, ruta: string } {
    
    if (datos.tiene_wifi_publico !== null && datos.tiene_wifi_publico !== undefined) {
       return { nombre: 'Ver Resumen Final', ruta: '/resumen' };
    }
    if (datos.medio_conexion_internet) return { nombre: 'Continuar: Servicios', ruta: '/servicios' };
    if (datos.conteosRam?.length > 0) return { nombre: 'Continuar: Conectividad', ruta: '/conectividad' };
    if (datos.total_internet !== null && datos.total_internet !== undefined) return { nombre: 'Continuar: Detalles Hardware', ruta: '/detalle-educativo' }; 
    if (datos.iddatos) return { nombre: 'Continuar: Internet', ruta: '/internet' }; 
    return { nombre: 'Comenzar Censo', ruta: '/paso1' };
  }
}