import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('hey')
  root(): string {
    return 'Hello World!';
  }
}
