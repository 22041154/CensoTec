import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CensoApiService } from '../../services/censo-api';

@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-usuarios.html',
  styleUrls: ['./admin-usuarios.css']
})
export class AdminUsuariosComponent implements OnInit {
  private censoService = inject(CensoApiService);

  usuarios: any[] = [];
  nuevoUsuario = { usuario: '', contrasena: '', role: 'user' };
  cargando = false;

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.cargando = true;
    this.censoService.listarUsuarios().subscribe({
      next: (res: any) => {
        this.usuarios = res.data?.attributes?.contenido || res.data || res.usuarios || res;
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }

  registrar() {
    if (!this.nuevoUsuario.usuario || !this.nuevoUsuario.contrasena) {
      alert('Llena todos los campos');
      return;
    }

    console.log('Enviando nuevo usuario:', this.nuevoUsuario);

    this.censoService.registrarUsuario(this.nuevoUsuario).subscribe({
    next: () => {
      alert(`Usuario ${this.nuevoUsuario.usuario} creado como ${this.nuevoUsuario.role}`);
      this.nuevoUsuario = { usuario: '', contrasena: '', role: 'user' };
      this.obtenerUsuarios();
    },
    error: (e) => alert('Error al registrar')
  });
}

  eliminar(id: number) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.censoService.eliminarUsuario(id).subscribe({
        next: () => this.obtenerUsuarios(),
        error: () => alert('Error al eliminar')
      });
    }
  }
}