import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/globalLogger.middleware';

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

    const PORT = process.env.PORT ?? 3000;
    await app.listen(PORT);

    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
  }
}

void bootstrap();
