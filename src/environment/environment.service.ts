import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private configService: ConfigService) {}

  isProduction(): boolean {
    return this.configService.get('NODE_ENV') === 'production';
  }

  get service() {
    return this.configService;
  }

  get NodeEnv(): string {
    return this.configService.get('NODE_ENV');
  }

  get Port(): number {
    return this.configService.get('PORT');
  }

  get DatabaseUrl(): string {
    return this.configService.get('DATABASE_URL');
  }
}
