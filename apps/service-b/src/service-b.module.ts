import { Module } from '@nestjs/common';
import { ServiceBController } from './service-b.controller';
import { ServiceBService } from './service-b.service';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		})
	],
	controllers: [ServiceBController],
	providers: [ServiceBService],
})
export class ServiceBModule { }
