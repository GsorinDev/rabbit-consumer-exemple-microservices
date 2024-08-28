import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebscrapModule } from './webscrap/webscrap.module';
import { RabbitModule } from './rabbit/rabbit.module';

@Module({})
export class AppModule {
  static forRoot(): DynamicModule {
    const modules = [RabbitModule];
    const controllers = [];
    const providers = [];
    const environment = process.env.NODE_ENV || 'local';
    const serviceName = process.env.MICROSERVICE_NAME;

    if (environment === 'local') {
      return {
        module: AppModule,
        imports: [WebscrapModule, RabbitModule],
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
