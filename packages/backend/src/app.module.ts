import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AppConfigModule } from '@/common/config/config.module';
import { AppConfigService } from '@/common/config/config.service';
import { DatabaseModule } from '@/common/database.module';
import { AuthModule } from '@/core/auth/auth.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AppConfigService],
})
export class AppModule {}
