import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('Your API description')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .addTag('Your API Tag')
    .build();

const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              
      forbidNonWhitelisted: true,   
      transform: true,              
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(3000);
}
bootstrap();
