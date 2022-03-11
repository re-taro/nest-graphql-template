import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  exports: [UserService],
  imports: [PrismaModule],
  providers: [UserService, UserResolver],
})
export class UserModule {}
