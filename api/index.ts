import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

let cachedServer: any = null;

async function createServer() {
  if (cachedServer) return cachedServer;

  const server = express();

  const nestApp = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server)
  );

  nestApp.enableCors({ origin: '*' });

  nestApp.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  await nestApp.init();

  console.log('✅ NestJS initialized successfully');

  cachedServer = server;
  return server;
}

export default async function handler(req: any, res: any) {
  try {
    const server = await createServer();
    return server(req, res);
  } catch (error: any) {
    console.error('Handler Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error?.message || 'Unknown error'
    });
  }
}