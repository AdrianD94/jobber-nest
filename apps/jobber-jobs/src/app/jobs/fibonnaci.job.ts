import { PulsarClient } from '@jobber/pulsar';
import { Job } from '../decorators/job.decorator';
import { AbstractJob } from '../abstract-job';
import { FibonnaciData } from './fibonnaci-data.interface';

@Job({
  name: 'Fibonnaci',
  description: 'Generate a fibonnaci sequence and store it to the database',
})
export class FibonnaciJob extends AbstractJob<FibonnaciData> {
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient);
  }
}
