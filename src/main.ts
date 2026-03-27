// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.enableCors();
//   app.useGlobalPipes(new ValidationPipe());

//   const config = new DocumentBuilder()
//     .setTitle('Contact API')
//     .setDescription('Portfolio Contact API 🚀')
//     .setVersion('1.0')
//     .build();

//   const document = SwaggerModule.createDocument(app, config);

//   SwaggerModule.setup('api', app, document);

//   // ✅ IMPORTANT CHANGE HERE
//   await app.listen(process.env.PORT || 3000);
// }
// bootstrap();



import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import serverlessExpress from '@vendia/serverless-express';

let cachedServer;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Contact API')
    .setDescription('Portfolio Contact API 🚀')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.init(); // ❗ IMPORTANT (instead of listen)

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export default async function handler(req, res) {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return cachedServer(req, res);
}