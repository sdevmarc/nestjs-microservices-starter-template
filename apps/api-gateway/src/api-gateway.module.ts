import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: 'env/.env.dev',
			validate: (env) => {
				if (!env.AUTH_SERVICE_PORT) {
					throw new Error('Missing AUTH_SERVICE_PORT');
				}
				return env;
			}
		}),
		ClientsModule.registerAsync([
			{
				name: 'AUTH_SERVICE',
				inject: [ConfigService],
				useFactory: (config: ConfigService) => ({
					transport: Transport.TCP,
					options: {
						host: config.get('AUTH_SERVICE_HOST'),
						port: Number(config.get('AUTH_SERVICE_PORT')),
					}
				})
			},
			{
				name: 'SERVICE_A',
				inject: [ConfigService],
				useFactory: (config: ConfigService) => ({
					transport: Transport.TCP,
					options: {
						host: config.get('SERVICE_A_HOST'),
						port: Number(config.get('SERVICE_A_PORT')),
					}
				})
			},
			{
				name: 'SERVICE_B',
				inject: [ConfigService],
				useFactory: (config: ConfigService) => ({
					transport: Transport.TCP,
					options: {
						host: config.get('SERVICE_B_HOST'),
						port: Number(config.get('SERVICE_B_PORT')),
					}
				})
			},
		])
	],
	controllers: [ApiGatewayController],
	providers: [ApiGatewayService],
})
export class ApiGatewayModule { }
