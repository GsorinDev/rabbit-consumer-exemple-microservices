import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebscrapModule } from './internal/webscrap/webscrap.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitModule } from './tools/rabbit/rabbit.module';

@Module({})
export class AppModule {
  static forRoot(): DynamicModule {
    const environment = process.env.NODE_ENV;
    const serviceName = process.env.MICROSERVICE_NAME;

    const configModule = ConfigModule.forRoot({
      envFilePath: environment === 'local' ? 'src/config/.env' : undefined,
      isGlobal: true,
    });

    const commonModules = [
      MongooseModule.forRoot(
        environment === 'local'
          ? 'mongodb://localhost:27018/web-watcher'
          : 'mongodb://mongodb:27017/web-watcher',
      ),
      RabbitModule,
    ];

    const modules = [...commonModules];
    const controllers = [];
    const providers = [];

    if (environment === 'local') {
      modules.push(WebscrapModule, configModule);
      controllers.push(AppController);
      providers.push(AppService);
    } else {
      this.configureModulesForService(
        serviceName,
        modules,
        controllers,
        providers,
      );
    }

    return {
      module: AppModule,
      imports: modules,
      controllers,
      providers,
    };
  }

  private static configureModulesForService(
    serviceName: string | undefined,
    modules: any[],
    controllers: any[],
    providers: any[],
  ) {
    if (!serviceName) return;

    if (serviceName === 'webscrapp-service') {
      modules.push(WebscrapModule);
    }

    if (serviceName === 'web-watcher-api') {
      controllers.push(AppController);
      providers.push(AppService);
    }
  }
}
