import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JobMetadata } from '../models/job-metadata.model';
import { JobsService } from '../services/job-service';
import { ExecuteJobInput } from '../dto/execute-job.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@jobber/graphql';
import { Job } from '../models/job.model';

@Resolver()
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @Query(() => [JobMetadata], { name: 'jobsMetadata' })
  @UseGuards(GqlAuthGuard)
  async getJobMetadata() {
    return this.jobsService.getJobMetadata();
  }

  @Mutation(() => Job)
  @UseGuards(GqlAuthGuard)
  async executeJob(@Args('executeJobInput') executeJobInput: ExecuteJobInput) {
    return this.jobsService.executeJobs(
      executeJobInput.name,
      executeJobInput.data
    );
  }
  @Query(() => [Job], { name: 'jobs' })
  @UseGuards(GqlAuthGuard)
  async getJobs() {
    return this.jobsService.getJobs();
  }

  @Query(() => Job, { name: 'job' })
  @UseGuards(GqlAuthGuard)
  async getJob(@Args('id') id: number) {
    return this.jobsService.getJob(id);
  }
}
