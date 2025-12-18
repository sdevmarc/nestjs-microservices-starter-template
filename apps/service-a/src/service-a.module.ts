import { Module } from '@nestjs/common';
import { ServiceAController } from './service-a.controller';
import { ServiceAService } from './service-a.service';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		})
	],
	controllers: [ServiceAController],
	providers: [ServiceAService],
})
export class ServiceAModule { }
