import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Conectar microserviço Redis
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: 'redis',
      port: 6379,
    },
  });

  // Inicializar microserviços
  await app.startAllMicroservices();

  // Inicializar app HTTP
  await app.listen(3001);
  console.log('🚀 App rodando em http://localhost:3001');
}
bootstrap();
