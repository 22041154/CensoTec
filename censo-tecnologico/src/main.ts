import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Censo Tecnológico API')
    .setDescription('Documentación de los endpoints del Censo')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document); 

  await app.listen(3000);
  console.log(` Servidor corriendo en: http://localhost:3000`);
  console.log(` Swagger disponible en: http://localhost:3000/swagger`);
}
bootstrap();