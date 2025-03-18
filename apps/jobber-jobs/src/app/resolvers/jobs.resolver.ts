import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Job } from '../models/jobs.model';
import { JobsService } from '../services/job-service';
import { ExecuteJobInput } from '../dto/execute-job.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@jobber/nestjs';

@Resolver()
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @Query(() => [Job], { name: 'jobs' })
  @UseGuards(GqlAuthGuard)
  async getJobs() {
    return this.jobsService.getJobs();
  }

  @Mutation(() => Job)
  @UseGuards(GqlAuthGuard)
  async executeJob(@Args('executeJobInput') executeJobInput: ExecuteJobInput) {
    return this.jobsService.executeJobs(
      executeJobInput.name,
      executeJobInput.data
    );
  }
}
