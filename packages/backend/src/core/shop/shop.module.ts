import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from './entities/item.entity';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '@/core/user/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity]), AuthModule, JwtModule],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
