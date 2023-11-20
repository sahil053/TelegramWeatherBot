import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT;

  // Enable CORS on initialization
  const app = await NestFactory.create(AppModule, { cors: true });
  
  await app.listen(PORT);
}

bootstrap();
