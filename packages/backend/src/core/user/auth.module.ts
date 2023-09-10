import { Module } from '@nestjs/common';

import { AppConfigModule } from '@/common/config/config.module';
import { AppConfigService } from '@/common/config/config.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => {
        return {
          global: true,
          secret: config.secretKey,
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
