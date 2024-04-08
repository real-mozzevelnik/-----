import { Module } from '@nestjs/common';
import { BasesService } from './dbases.service';
import { BasesController } from './dbases.controller';

@Module({
  providers: [BasesService],
  controllers: [BasesController],
})
export class DbasesModule {}
