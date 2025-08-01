import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@shared/filters/http-exception.filter';
import { ThrottlerGuard } from '@nestjs/throttler';
import helmet from 'helmet';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { SWAGGER_AUTH_SCHEMES } from './shared/constants/swagger.constants';

async function server() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Security
  app.use(helmet());
  app.useGlobalGuards(app.get(ThrottlerGuard));

  // Configure cookie parser
  app.use(cookieParser());

  // Setup express-session middleware
  app.use(
    session({
      secret: configService.get('JWT_SECRET'), // Use your existing JWT secret
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: configService.get('NODE_ENV') === 'production', // Use secure cookies in production
        maxAge: 60 * 60 * 1000, // 1 hour session timeout
      },
    }),
  );

  // Apply global pipes and filters
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that don't have decorators
      transform: true, // Transform payloads to DTO instances
      forbidNonWhitelisted: true, // Throw errors if non-whitelisted properties are present
    }),
  );

  // Apply global exception filter
  const exceptionFilter = app.get(HttpExceptionFilter);
  app.useGlobalFilters(exceptionFilter);

  // Configure CORS
  app.enableCors({
    origin: configService.get('ALLOWED_ORIGINS').split(','),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
    maxAge: 3600, // 1 hour
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      SWAGGER_AUTH_SCHEMES.JWT,
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = configService.get('PORT');
  await app.listen(port);

  const nodeEnv = configService.get('NODE_ENV');
  console.log(`Application is running in ${nodeEnv} mode on port ${port}`);
}

server();
