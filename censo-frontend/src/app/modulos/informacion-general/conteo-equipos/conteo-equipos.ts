import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CensoApiService } from '../../../services/censo-api';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-conteo-equipos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './conteo-equipos.html', 
  styleUrls: ['./conteo-equipos.css']
})
export class ConteoEquipos {
  private authService = inject(AuthService);
  private censoService = inject(CensoApiService);
  private router = inject(Router);

  cerrarSesion() {
    this.authService.logout();
  }

  datos = {
    operativas: null,
    reparacion: null,
    reserva: null
  };

  errores = {
    operativas: false,
    reparacion: false,
    reserva: false
  };

  guardar() {
    this.errores.operativas = false;
    this.errores.reparacion = false;
    this.errores.reserva = false;
    
    let todoValido = true;

    if (this.datos.operativas === null || this.datos.operativas < 0) {
      this.errores.operativas = true;
      todoValido = false;
    }
    if (this.datos.reparacion === null || this.datos.reparacion < 0) {
      this.errores.reparacion = true;
      todoValido = false;
    }
    if (this.datos.reserva === null || this.datos.reserva < 0) {
      this.errores.reserva = true;
      todoValido = false;
    }

    if (todoValido) {
      console.log('Enviando datos a la nube...', this.datos);

      const tempDept = localStorage.getItem('temp_departamento');
      const payload: any = { ...this.datos };
      if (tempDept) payload.departamento = tempDept;

      this.censoService.guardarConteoInicial(payload).subscribe({
        next: (respuesta: any) => { 
          console.log('¡Guardado exitoso!', respuesta);
          
          const idRecibido = respuesta.iddatos || respuesta.id;

          if (idRecibido) {

            localStorage.setItem('id_censo_actual', idRecibido);
            
            // previously used a localStorage flag here; remove to avoid persistent blocking
            
            this.router.navigate(['/internet']);
            
          } else {
            alert(' Se guardó, pero no recibimos el ID. Revisa la consola.');
          }
        },
        error: (error) => {
          console.error('Error al guardar:', error);
          alert(' Ocurrió un error al conectar con el servidor.');
        }
      });

        }
  }
}