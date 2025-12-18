import { NestFactory } from '@nestjs/core';
import { ServiceBModule } from './service-b.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const appContext = await NestFactory.createApplicationContext(ServiceBModule);
		const config = appContext.get(ConfigService);
	
		const port = config.get<number>('SERVICE_B_PORT', 5004);
	
		await appContext.close();
	
		const app = await NestFactory.createMicroservice(ServiceBModule, {
			transport: Transport.TCP,
			options: {
				host: '0.0.0.0',
				port
			}
		});
	
		await app.listen();
}
bootstrap();
