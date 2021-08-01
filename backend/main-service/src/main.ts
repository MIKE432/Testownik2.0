import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { applyConfig, configOptions, ConfigOptions } from './Config';
import { setupSwagger } from '../SetupSwagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    bodyParser: true,
  });

  applyConfig(app, setupSwagger);
  const config = configOptions();
  console.log(config);

  await app.listen(config.port!);
}

bootstrap();
