import { Module } from '@nestjs/common';
import { BasketController } from '@/core/basket/basket.controller';
import { BasketService } from '@/core/basket/basket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Basket } from '@/core/basket/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Basket])],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
