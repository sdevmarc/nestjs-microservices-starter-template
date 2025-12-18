import { NestFactory } from '@nestjs/core';
import { ServiceAModule } from './service-a.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const appContext = await NestFactory.createApplicationContext(ServiceAModule);
	const config = appContext.get(ConfigService);

	const port = config.get<number>('SERVICE_A_PORT', 5003);

	await appContext.close();

	const app = await NestFactory.createMicroservice(ServiceAModule, {
		transport: Transport.TCP,
		options: {
			host: '0.0.0.0',
			port
		}
	});

	await app.listen();
}
bootstrap();
