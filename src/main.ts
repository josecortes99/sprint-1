// main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Documentacion swagger
  const config = new DocumentBuilder()
    .setTitle('API de Ejemplo')
    .setDescription('Documentación de la API con Swagger y JWT')
    .setVersion('1.0')
    .addTag('tasks')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Introduce tu token JWT aquí',
      },
      'access-token', // nombre del esquema de seguridad
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000);
  console.log('Servidor corriendo en http://localhost:3000');
  console.log('Swagger disponible en http://localhost:3000/api/docs');
}
bootstrap();
