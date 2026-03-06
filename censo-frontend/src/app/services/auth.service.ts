import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private baseUrl = environment.apiUrl || 'http://localhost:3000';

  login(usuario: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, { usuario, contrasena })
      .pipe(
        tap(response => {
          if (response.access_token) {
            // Almacenamos el token para sesiones futuras
            localStorage.setItem('token', response.access_token);
          }
        })
      );
  }

  logout() {
    // Limpiamos los datos locales para cerrar la sesión por completo
    localStorage.removeItem('token');
    localStorage.removeItem('id_censo_actual'); 
    localStorage.removeItem('temp_departamento');
    this.router.navigate(['/login']);
  }

  obtenerUsuarioId(): number | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      // Decodificamos el payload del JWT
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub; // 'sub' contiene el idusuario
    } catch (e) {
      return null;
    }
  }

  /**
   * Obtiene el rol del usuario desde el token.
   * IMPORTANTE: Debe buscar 'rol' (en español) para coincidir con el Backend.
   */
  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Payload del token:', payload); // Útil para depurar en F12
      return payload.rol || null; 
    } catch (e) {
      console.error('Error decodificando token:', e);
      return null;
    }
  }

  // Método alias para mantener compatibilidad con el componente de Inicio
  obtenerRol(): string | null {
    return this.getUserRole();
  }

  estaLogueado(): boolean {
    return !!localStorage.getItem('token');
  }
}