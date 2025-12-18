import { Controller, Get, Inject } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class ApiGatewayController {
	constructor(
		private readonly apiGatewayService: ApiGatewayService,
		@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
		@Inject('SERVICE_A') private readonly serviceA: ClientProxy,
		@Inject('SERVICE_B') private readonly serviceB: ClientProxy

	) { }

	@Get()
	getHello(): string {
		return this.apiGatewayService.getHello();
	}

	@Get('auth/hello')
	getHelloAuthService() {
		return firstValueFrom(this.authClient.send('auth.hello', {}))
	}

	@Get('service-a/hello')
	getHelloServiceA() {
		return firstValueFrom(this.serviceA.send('service-a.hello', {}))
	}

	@Get('service-b/hello')
	getHelloServiceB() {
		return firstValueFrom(this.serviceB.send('service-b.hello', {}))
	}
}
