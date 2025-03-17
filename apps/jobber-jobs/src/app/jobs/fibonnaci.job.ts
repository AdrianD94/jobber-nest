import { Job } from '../decorators/job.decorator';
import { AbstractJob } from './abstract-job';

@Job({
  name: 'Fibonnaci',
  description: 'Generate a fibonnaci sequence and store it to the database',
})
export class FibonnaciJob extends AbstractJob {}
