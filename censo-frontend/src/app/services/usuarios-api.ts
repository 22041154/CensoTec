import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuariosApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl || 'http://localhost:3000';

  list(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/usuarios`);
  }

  create(usuario: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/usuarios/registro`, { usuario, contrasena });
  }

  update(id: number, data: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/usuarios/${id}`, data);
  }

  setRole(id: number, role: 'admin' | 'user'): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/usuarios/${id}/role`, { role });
  }

  remove(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/usuarios/${id}`);
  }
}
