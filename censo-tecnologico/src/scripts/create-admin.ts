import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsuariosService } from '../usuarios/usuarios.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  try {
    const usuariosService = app.get(UsuariosService);
    const existing = await usuariosService.encontrarPorNombre('admin');
    if (existing) {
      console.log('Usuario admin ya existe:', existing.usuario);
    } else {
      const admin = await usuariosService.crear('admin', 'admin1234');
      // set role to admin
      await usuariosService.update(admin.id, { role: 'admin' } as any);
      console.log('Usuario admin creado: usuario=admin, contraseña=admin1234');
    }
  } catch (err) {
    console.error('Error creando admin:', err);
  } finally {
    await app.close();
  }
}

bootstrap();
