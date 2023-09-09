import { AppConfigModule } from '@/common/config/config.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigService } from '@/common/config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => {
        const { host, port, password, database, username } =
          configService.postgres;

        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          applicationName: '@midis-shop/backend',
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
