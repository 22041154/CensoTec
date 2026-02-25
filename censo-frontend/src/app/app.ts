import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('censo-frontend');
  private authService = inject(AuthService);
  private router = inject(Router);

  cerrarSesion() {
    this.authService.logout();
  }

  mostrarHeader() {
    const url = this.router.url || '';
    const ocultarEn = ['/login', '/inicio', '/resumen'];
    return !ocultarEn.some(prefix => url.startsWith(prefix));
  }
}
