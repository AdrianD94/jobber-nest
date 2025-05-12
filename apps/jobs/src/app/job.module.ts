import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { Packages } from '@jobber/grpc';
import { PulsarModule } from '@jobber/pulsar';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { FibonacciJob } from './jobs/fibonnaci/fibonacci.job';
import { JobsResolver } from './resolvers/jobs.resolver';
import { JobsService } from './services/job-service';
import { UploadModule } from './upload/upload.module';
import { LoadProductsJob } from './jobs/products/load-products.job';
import { PrismaModule } from './prisma/prisma.module';
import { JobsController } from './jobs.controller';

@Module({
  imports: [
    DiscoveryModule,
    PulsarModule,
    PrismaModule,
    UploadModule,
    ClientsModule.registerAsync([
      {
        name: Packages.AUTH,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.getOrThrow('AUTH_GRPC_SERVICE_URL'),
            package: Packages.AUTH,
            protoPath: join(__dirname, '../../libs/grpc/proto/auth.proto'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [FibonacciJob, JobsService, JobsResolver, LoadProductsJob],
  controllers: [JobsController],
})
export class JobModule {}
