import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CensoApiService {

  private baseUrl = environment.apiUrl || 'http://localhost:3000';
  private http = inject(HttpClient);

  constructor() { }

  guardarConteoInicial(datos: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/datos-escuela`, datos);
  }

  actualizarDatos(id: number, datos: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/datos-escuela/${id}`, datos);
  }

  obtenerDatosEscuela(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/datos-escuela/${id}`);
  }

  obtenerCatalogos(): Observable<any> {
    return forkJoin({
      ram: this.http.get<any>(`${this.baseUrl}/MemoriasRam`).pipe(
        map(res => res.data.attributes.contenido)
      ),
      so: this.http.get<any>(`${this.baseUrl}/SistemasOperativos`).pipe(
        map(res => res.data.attributes.contenido)
      ),
      discos: this.http.get<any>(`${this.baseUrl}/discos`).pipe(
        map(res => res.data.attributes.contenido)
      ),
      antiguedades: this.http.get<any>(`${this.baseUrl}/antiguedades`).pipe(
        map(res => res.data.attributes.contenido)
      ),
      tipos: this.http.get<any>(`${this.baseUrl}/tipos-computadora`).pipe(
        map(res => res.data.attributes.contenido)
      )
    });
  }
  
  obtenerMiProgreso(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/datos-escuela/mi-progreso`);
  }

  obtenerCatalogosPaso4(): Observable<any> {
    return forkJoin({
      adquisiciones: this.http.get<any>(`${this.baseUrl}/tipo-adquisicion`).pipe(
        map(res => res.data.attributes.contenido)
      ),
      medios: this.http.get<any>(`${this.baseUrl}/medio-conexion`).pipe(
        map(res => res.data.attributes.contenido)
      ),
      velocidades: this.http.get<any>(`${this.baseUrl}/velocidad-internet`).pipe(
        map(res => res.data.attributes.contenido)
      )
    });
  }

  obtenerCatalogosPaso5(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/perfil-wifi`).pipe(
      map(res => res.data.attributes.contenido)
    );
  }
  guardarComputadora(datos: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/computadoras`, datos).pipe(
      map(res => res.data.attributes.contenido)
    );
  }

  obtenerDepartamentosDisponibles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/datos-escuela/disponibles/departamentos`);
  }
}