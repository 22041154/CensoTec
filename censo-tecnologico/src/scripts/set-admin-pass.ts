import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsuariosService } from '../usuarios/usuarios.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  try {
    const usuariosService = app.get(UsuariosService);
    const existing = await usuariosService.encontrarPorNombre('admin');
    if (!existing) {
      console.error('No existe usuario "admin". Crea uno primero.');
    } else {
      await usuariosService.update(existing.id, { contrasena: 'admin1234' } as any);
      console.log('Contraseña de admin restablecida a: admin1234');
    }
  } catch (err) {
    console.error('Error al restablecer contraseña admin:', err);
  } finally {
    await app.close();
  }
}

bootstrap();
