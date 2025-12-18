import { Controller, Get } from '@nestjs/common';
import { ServiceBService } from './service-b.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ServiceBController {
  constructor(private readonly serviceBService: ServiceBService) {}

  @MessagePattern('service-b.hello')
  getHello(): string {
    return this.serviceBService.getHello();
  }
}
