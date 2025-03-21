import { PulsarClient } from '@jobber/pulsar';
import { Job } from '../decorators/job.decorator';
import { AbstractJob } from '../abstract-job';
import { FibonacciData } from './fibonacci-data.message';

@Job({
  name: 'Fibonacci',
  description: 'Generate a fibonacci sequence and store it to the database',
})
export class FibonacciJob extends AbstractJob<FibonacciData> {
  protected messageClass = FibonacciData;
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient);
  }
}
