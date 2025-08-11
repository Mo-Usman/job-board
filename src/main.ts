import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/guards/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Setup
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API routes list')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Log all registered routes (works with Express)
  const server = app.getHttpAdapter().getInstance();
  const router = server._router?.stack ?? [];

  Logger.log('📡 Registered Routes:', 'NestJS');

  router
    .filter((layer) => layer.route)
    .forEach((layer) => {
      const methods = Object.keys(layer.route.methods)
        .map((method) => method.toUpperCase())
        .join(', ');
      const path = layer.route.path;
      Logger.log(`➡️  [${methods}] ${path}`, 'Route');
    });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
