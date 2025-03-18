import { Injectable, OnModuleInit } from '@nestjs/common';
import { PulsarClient, PulsarConsumer } from '@jobber/pulsar';
import { FibonnaciData } from './fibonnaci-data.interface';
import { iterate } from 'fibonacci';

@Injectable()
export class FibonacciConsumer
  extends PulsarConsumer<FibonnaciData>
  implements OnModuleInit
{
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient, 'Fibonnaci');
  }
  protected onMessage(data: FibonnaciData): any {
    const result = iterate(data.iterations);
    this.logger.log(`Generated fibonnaci sequence ${JSON.stringify(result)}`);
  }
}
