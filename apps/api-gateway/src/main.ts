import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create(ApiGatewayModule);

	const config = app.get(ConfigService);
	const port = config.get<number>('API_GATEWAY_SERVICE_PORT', 5001);

	app.setGlobalPrefix('api');
	app.enableCors();

	await app.listen(port);
}
bootstrap();
