import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from './entities/item.entity';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemEntity]),
    
  ],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
