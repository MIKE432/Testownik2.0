import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { applyConfig, ConfigOptions } from "./Config";
import { setupSwagger } from "../SetupSwagger";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true,
        bodyParser: true,
    });

    applyConfig(app, setupSwagger)

    await app.listen(ConfigOptions.port);
}

bootstrap();
