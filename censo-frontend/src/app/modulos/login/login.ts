import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  credenciales = {
    usuario: '',
    contrasena: ''
  };

  error = false;
  mensajeError = '';
  cargando = false;

  ingresar() {
    this.cargando = true;
    this.error = false;

    this.authService.login(this.credenciales.usuario, this.credenciales.contrasena)
      .subscribe({
        next: () => {
          this.router.navigate(['/inicio']); 
        },
        error: (err) => {
          this.cargando = false;
          this.error = true;
          this.mensajeError = 'Usuario o contraseña incorrectos';
          console.error(err);
        }
      });
  }
}