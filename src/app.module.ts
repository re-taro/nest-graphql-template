import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'node:path';
import { EnvironmentModule } from './environment/environment.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: process.env.NODE_ENV !== 'production',
      driver: ApolloDriver,
      playground: process.env.NODE_ENV !== 'production',
      sortSchema: true,
    }),
    PrismaModule,
    UserModule,
    EnvironmentModule,
  ],
})
export class AppModule {}
