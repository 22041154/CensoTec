import { Routes } from '@angular/router';
import { LoginComponent } from './modulos/login/login';
import { Inicio } from './modulos/inicio/inicio';
import { ConteoEquipos } from './modulos/informacion-general/conteo-equipos/conteo-equipos';
import { ConexionInternetComponent } from './modulos/informacion-general/conexion-internet/conexion-internet';
import { DetalleEducativoComponent } from './modulos/detalle-educativo/detalle-educativo';
import { Conectividad } from './modulos/conectividad/conectividad';
import { ServiciosComponent } from './modulos/servicios/servicios';
import { Resumen } from './modulos/resumen/resumen';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: Inicio },
  
  { path: 'paso1', component: ConteoEquipos },
  { path: 'internet', component: ConexionInternetComponent },
  { path: 'detalle-educativo', component: DetalleEducativoComponent },
  { path: 'conectividad', component: Conectividad },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'resumen', component: Resumen },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];