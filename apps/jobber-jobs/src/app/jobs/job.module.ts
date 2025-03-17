import { Module } from '@nestjs/common';
import { FibonnaciJob } from './fibonnaci.job';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { JobsService } from './services/job-service';
import { JobsResolver } from './resolvers/jobs.resolver';

@Module({
  imports: [DiscoveryModule],
  providers: [FibonnaciJob, JobsService, JobsResolver],
})
export class JobModule {}
