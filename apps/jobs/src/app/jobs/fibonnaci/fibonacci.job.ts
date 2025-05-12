import { PulsarClient } from '@jobber/pulsar';
import { Job } from '../../decorators/job.decorator';
import { FibonacciMessage } from '@jobber/pulsar';
import { AbstractJob } from '../abstract-job';
import { Jobs } from '@jobber/nestjs';

@Job({
  name: Jobs.FIBONACCI,
  description: 'Generate a fibonacci sequence and store it to the database',
})
export class FibonacciJob extends AbstractJob<FibonacciMessage> {
  protected messageClass = FibonacciMessage;
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient);
  }
}
