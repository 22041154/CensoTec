import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // Añadido RouterLink
import { CensoApiService } from '../../services/censo-api'; 
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // Añadido RouterLink aquí
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
  esAdmin: boolean = false; // Variable para el acceso seguro

  // VARIABLES DE DEPARTAMENTO
  departamentoSeleccionado: string = '';
  departamentoInicialGuardado: string = '';
  departamentoBloqueado: boolean = false;
  tempDepartamento: string | null = null;
  departamentos: string[] = [];

  ngOnInit() {
    this.verificarRol(); // Comprobar si es admin para el botón del CMS
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

  verificarRol() {
  const rol = this.authService.obtenerRol();
  console.log('Rol detectado:', rol);
  this.esAdmin = (rol === 'admin');
}

  cargarDepartamentosDisponibles() {
  this.censoService.obtenerDepartamentosDisponibles().subscribe({
    next: (departamentos) => {
      // Si el backend ya envía la lista nueva, la usamos
      this.departamentos = departamentos;
    },
    error: (err) => {
      console.error('Error obteniendo departamentos disponibles', err);
      // Nueva lista actualizada según tu requerimiento
      this.departamentos = [
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
            this.departamentoBloqueado = true;
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

    this.cargandoBtn = true;

    if (this.datosGuardados && !this.datosGuardados.departamento) {
      this.censoService.actualizarDatos(this.datosGuardados.iddatos, { 
        departamento: this.departamentoSeleccionado 
      }).subscribe({
        next: () => {
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
      localStorage.setItem('temp_departamento', this.departamentoSeleccionado);
      this.tempDepartamento = this.departamentoSeleccionado;
      this.departamentoBloqueado = true;
      this.departamentoInicialGuardado = this.departamentoSeleccionado;
      this.router.navigate([this.rutaDestino]);
    }
    else {
      this.router.navigate([this.rutaDestino]);
    }
  }

  onDepartamentoChange() { }

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