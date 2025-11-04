import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'data-source';
import { LocationModule } from './location/location.module';
import { ModuleSystemModule } from './module-system/module-system.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // torna disponível em toda a aplicação
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    LocationModule,
    ModuleSystemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
