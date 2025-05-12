import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PulsarClient, PulsarConsumer } from '@jobber/pulsar';
import { FibonacciMessage } from '@jobber/pulsar';
import { iterate } from 'fibonacci';
import { Jobs } from '@jobber/nestjs';
import { JobConsumer } from '../jobs.consumer';
import { Packages } from '@jobber/grpc';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class FibonacciConsumer
  extends JobConsumer<FibonacciMessage>
  implements OnModuleInit
{
  constructor(
    pulsarClient: PulsarClient,
    @Inject(Packages.JOBS) clientJobs: ClientGrpc
  ) {
    super(Jobs.FIBONACCI, pulsarClient, clientJobs);
  }
  protected execute(data: FibonacciMessage): any {
    const result = iterate(data.iterations);
    this.logger.log(`Generated fibonacci sequence ${JSON.stringify(result)}`);
  }
}
