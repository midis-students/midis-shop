import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AppConfigModule } from '@/common/config/config.module';
import { AppConfigService } from '@/common/config/config.service';

@Module({
  imports: [AppConfigModule],
  controllers: [AppController],
  providers: [AppService, AppConfigService],
})
export class AppModule {}
