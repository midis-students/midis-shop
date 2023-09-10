import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AppConfigModule } from '@/common/config/config.module';
import { AppConfigService } from '@/common/config/config.service';
import { DatabaseModule } from '@/common/database.module';
import { ShopModule } from './core/shop/shop.module';
import { AuthModule } from '@/core/user/auth.module';
import { BasketModule } from '@/core/basket/basket.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    AuthModule,
    ShopModule,
    BasketModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppConfigService],
})
export class AppModule {}
