import {
  DiscoveredClassWithMeta,
  DiscoveryService,
} from '@golevelup/nestjs-discovery';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { JOB_METADATA_KEY } from '../decorators/job.decorator';
import { JobMetadata } from '../interfaces/job-metadata.interface';
import { AbstractJob } from '../jobs/abstract-job';
import { readFileSync } from 'fs';
import { UPLOAD_FILE_PATH } from '../upload/upload';
import { PrismaService } from '../prisma/prisma.service';
import { JobStatus } from '../models/job-status.enum';
import { Job } from '@prisma-clients/jobs';

@Injectable()
export class JobsService implements OnModuleInit {
  private jobs: DiscoveredClassWithMeta<JobMetadata>[];
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly prismaService: PrismaService
  ) {}
  async onModuleInit() {
    this.jobs = await this.discoveryService.providersWithMetaAtKey<JobMetadata>(
      JOB_METADATA_KEY
    );
  }

  getJobMetadata() {
    return this.jobs.map((job) => job.meta);
  }

  async executeJobs(name: string, data: any) {
    const job = this.jobs.find((job) => job.meta.name === name);
    if (!job) {
      throw new BadRequestException(`Job ${name} does not exists`);
    }
    if (!(job.discoveredClass.instance instanceof AbstractJob)) {
      throw new InternalServerErrorException(
        'Job is not an instance of AbstractJob'
      );
    }

    return job.discoveredClass.instance.execute(
      data.fileName ? this.getFile(data.fileName) : data,
      job.meta.name
    );
  }

  private getFile(fileName?: string) {
    if (!fileName) {
      return;
    }
    try {
      return JSON.parse(
        readFileSync(`${UPLOAD_FILE_PATH}/${fileName}`, 'utf-8')
      );
    } catch (error) {
      throw new InternalServerErrorException(
        `Error reading file ${fileName}: ${error.message}`
      );
    }
  }

  async acknowledge(jobId: number) {
    const job = await this.prismaService.job.findUnique({
      where: { id: jobId },
    });
    if (!job) {
      throw new BadRequestException(`Job ${jobId} does not exists`);
    }
    if (job.ended) {
      return;
    }
    const updatedJob = await this.prismaService.job.update({
      where: { id: jobId },
      data: {
        completed: { increment: 1 },
      },
    });
    if (updatedJob.completed === job.size) {
      await this.prismaService.job.update({
        where: { id: jobId },
        data: {
          status: JobStatus.COMPLETED,
          ended: new Date(),
        },
      });
    }
    return updatedJob;
  }

  async getJobs(): Promise<Job[]> {
    return this.prismaService.job.findMany();
  }

  async getJob(id: number): Promise<Job> {
    return this.prismaService.job.findUnique({ where: { id } });
  }
}
