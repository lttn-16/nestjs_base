import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Tự remove field không có trong DTO
      forbidNonWhitelisted: true, // Không chỉ remove mà còn báo lỗi luôn.
      transform: true, // Convert kiểu dữ liệu.
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
