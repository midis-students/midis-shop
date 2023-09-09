import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvConfig } from '@/config/env';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get port() {
    return this.get('port');
  }

  get env() {
    return this.get('NODE_ENV');
  }

  get postgres() {
    return this.get('postgres');
  }

  get secretKey() {
    return this.get('secretKey');
  }

  private get<T extends keyof EnvConfig>(key: T) {
    return this.configService.get<EnvConfig[T]>(key);
  }
}
