import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './environment.dto';
import { EnvironmentService } from './environment.service';

@Global()
@Module({
  exports: [EnvironmentService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      validate,
    }),
  ],
  providers: [EnvironmentService],
})
export class EnvironmentModule {}
