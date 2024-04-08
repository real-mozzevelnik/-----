import { Controller, Post, Body } from '@nestjs/common';
import { BasesService } from './dbases.service';

@Controller('dbases')
export class BasesController {
  constructor(private baseService: BasesService) {}

  @Post('addBase')
  addBase(@Body('name') name, @Body('host') host, @Body('port') port) {
    return this.baseService.addBase(name, host, port);
  }

  @Post('delete')
  deleteBase(@Body('name') name) {
    return this.baseService.deleteBase(name);
  }
  @Post('getBases')
  getBases() {
    return this.baseService.getBases();
  }
}
