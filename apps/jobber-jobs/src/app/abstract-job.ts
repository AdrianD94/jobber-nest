import { PulsarClient, serialize } from '@jobber/pulsar';
import { Producer } from 'pulsar-client';

export abstract class AbstractJob<T> {
  private producer: Producer;
  constructor(private readonly pulsarClient: PulsarClient) {}
  async execute(data: T, job: string) {
    if (!this.producer) {
      this.producer = await this.pulsarClient.createProducer(job);
    }
    await this.producer.send({ data: serialize(data) });
  }
}
