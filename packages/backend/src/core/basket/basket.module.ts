import { Module } from '@nestjs/common';
import { BasketController } from '@/core/basket/basket.controller';
import { BasketService } from '@/core/basket/basket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Basket } from '@/core/basket/entity/basket.entity';
import { AuthModule } from '@/core/user/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Basket]), AuthModule, JwtModule],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
