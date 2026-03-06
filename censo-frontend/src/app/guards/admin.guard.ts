import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  private auth = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean {
    const role = this.auth.getUserRole();
    if (role === 'admin') return true;
    alert('Acceso denegado: se requieren permisos de administrador.');
    this.router.navigate(['/login']);
    return false;
  }
}

export default AdminGuard;
