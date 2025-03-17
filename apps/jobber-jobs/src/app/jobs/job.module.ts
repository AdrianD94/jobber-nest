import { Module } from '@nestjs/common';
import { FibonnaciJob } from './fibonnaci.job';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { JobsService } from './services/job-service';
import { JobsResolver } from './resolvers/jobs.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from 'types/proto/auth';
import { join } from 'path';

@Module({
  imports: [
    DiscoveryModule,
    ClientsModule.register([
      {
        name: AUTH_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, 'proto/auth.proto'),
        },
      },
    ]),
  ],
  providers: [FibonnaciJob, JobsService, JobsResolver],
})
export class JobModule {}
