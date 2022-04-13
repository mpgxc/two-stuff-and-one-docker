import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'classroom',
        brokers: [process.env.KAFKA_BROKERS as string],
      },
      consumer: {
        groupId: 'purchases',
      },
    },
  });

  app.startAllMicroservices().then(() => {
    console.log('[MICROSERVICE] is running!');
  });

  app.listen(process.env.APP_PORT || 3000).then(() => {
    console.log('[HTTP/GRAPHQL] is running!');
  });
}
bootstrap();
