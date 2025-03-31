import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/globalLogger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.use(loggerGlobal);
//   await app.listen(process.env.PORT ?? 3000);
//   console.log('Servidor corriendo en el puerto 3000');
// }
// void bootstrap();

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.use(loggerGlobal);
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    const PORT = process.env.PORT ?? 3000;
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Ecommerce-demo')
      .setDescription('Proyecto de backend Henry M4')
      .addBearerAuth()
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
    await app.listen(PORT);

    console.log(` Servidor corriendo en http://localhost:${PORT}`);
  } catch (error) {
    console.error(' Error al iniciar el servidor:', error);
  }
}

void bootstrap();
