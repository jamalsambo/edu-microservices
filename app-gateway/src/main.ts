import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Domínio permitido
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: false, // Caso precise enviar cookies ou autenticações de sessão
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
