declare const module: any;

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const globalPrefix = '/api';
  const port = 8000;
  // TODO disable in prod
  app.enableCors();

  const options = new DocumentBuilder()
  .setTitle('BIDS example')
  .setDescription('The BIDS API description')
  .setVersion('1.0')
  .addTag('bids')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  Logger.log('bootstrap');

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  // Log current url of app
  
  Logger.log(
    `Swagger UI: http://localhost:${port}${globalPrefix}`,
  );

}
bootstrap();
