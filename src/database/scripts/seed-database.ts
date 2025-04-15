import { NestFactory } from '@nestjs/core';
import { SeederService } from '../seeder.service';
import { SeederModule } from '../seeder.module';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeederModule);

  try {
    const seeder = appContext.get(SeederService);
    await seeder.seed();
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await appContext.close();
  }
}

bootstrap();