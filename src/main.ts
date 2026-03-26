import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // ✅ Better validation setup
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // removes extra fields
      forbidNonWhitelisted: true, // throws error for unknown fields
      transform: true, // auto transform payloads
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Contact API')
    .setDescription('Portfolio Contact API 🚀')
    .setVersion('1.0')
    .addTag('Contact') // ✅ helps group APIs
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // useful if you add auth later
    },
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();