import { Controller, Get } from '@nestjs/common';
import { ServiceAService } from './service-a.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ServiceAController {
  constructor(private readonly serviceAService: ServiceAService) { }

  @MessagePattern('service-a.hello')
  getHello(): string {
    return this.serviceAService.getHello();
  }
}
