import {
  AcknowledgeRequest,
  AcknowledgeResponse,
  JobsServiceController,
  JobsServiceControllerMethods,
} from '@jobber/grpc';
import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JobsService } from './services/job-service';

@Controller()
@JobsServiceControllerMethods()
export class JobsController implements JobsServiceController {
  constructor(private readonly jobsService: JobsService) {}
  async acknowledge(request: AcknowledgeRequest) {
    await this.jobsService.acknowledge(request.jobId);
  }
}
