import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { applyConfig, configOptions } from './Config';
import { setupSwagger } from '../SetupSwagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    bodyParser: true
  });

  applyConfig(app, setupSwagger);
  const config = configOptions();

  await app.listen(config.appPort!);
}

bootstrap();
