import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const appContext = await NestFactory.createApplicationContext(AuthServiceModule);
	const config = appContext.get(ConfigService);

	const port = config.get<number>('AUTH_SERVICE_PORT', 5002);

	await appContext.close();

	const app = await NestFactory.createMicroservice(AuthServiceModule, {
		transport: Transport.TCP,
		options: {
			host: '0.0.0.0',
			port
		}
	});

	await app.listen();
}
bootstrap();