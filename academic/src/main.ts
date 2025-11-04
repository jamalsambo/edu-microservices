import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3005);
  console.log('🚀 App rodando em http://localhost:' + process.env.PORT);
}
bootstrap();
