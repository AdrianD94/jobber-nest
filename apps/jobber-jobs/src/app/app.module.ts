import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JobModule } from './jobs/job.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JobModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
