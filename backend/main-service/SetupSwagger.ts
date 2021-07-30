import { ConfigFunction } from './src/Config';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger: ConfigFunction = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Testownik 2.0')
    .setDescription('')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
};
