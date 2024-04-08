import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DbasesModule } from './dbases/dbases.module';

@Module({
  imports: [AuthModule, DbasesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
