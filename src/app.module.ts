import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebscrapModule } from './webscrap/webscrap.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitModule } from './rabbit/rabbit.module';

@Module({
  imports: [RabbitModule],
})
export class AppModule {
  static forRoot(): DynamicModule {
    const modules: any[] = [
      MongooseModule.forRoot('mongodb://mongodb:27017/web-watcher'),
      RabbitModule,
    ];
    const controllers = [];
    const providers = [];
    const environment = process.env.NODE_ENV || 'local';
    const serviceName = process.env.MICROSERVICE_NAME;

    if (environment === 'local') {
      return {
        module: AppModule,
        imports: [
          WebscrapModule,
          ConfigModule.forRoot({
            envFilePath: 'src/config/.env',
            isGlobal: true,
          }),
          MongooseModule.forRoot('mongodb://localhost:27018/web-watcher'),
          RabbitModule,
        ],
        controllers: [AppController],
        providers: [AppService],
      };
    }

    switch (serviceName) {
      case 'webscrapp-service':
        modules.push(WebscrapModule);
      case 'web-watcher-api':
        controllers.push(AppController);
        providers.push(AppService);
    }

    return {
      module: AppModule,
      imports: modules,
      controllers,
      providers,
    };
  }
}
