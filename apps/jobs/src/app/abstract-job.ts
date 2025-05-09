import { plainToInstance } from 'class-transformer';
import { PulsarClient, serialize } from '@jobber/pulsar';
import { Producer } from 'pulsar-client';
import { FibonacciData } from './jobs/fibonacci-data.message';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export abstract class AbstractJob<T extends object> {
  private producer: Producer;
  protected abstract messageClass: new () => T;
  constructor(private readonly pulsarClient: PulsarClient) {}
  async execute(data: T, job: string) {
    await this.validateData(data);

    if (!this.producer) {
      this.producer = await this.pulsarClient.createProducer(job);
    }

    if (Array.isArray(data)) {
      for (const item of data) {
        await this.send(item);
      }
      return;
    }
    await this.send(data);
  }

  private async validateData(data: T) {
    const errors = await validate(plainToInstance(this.messageClass, data));
    if (errors.length) {
      throw new BadRequestException(
        `Job data is invalid: ${JSON.stringify(errors)}`
      );
    }
  }

  private async send(data: T) {
    await this.producer.send({ data: serialize(data) });
  }
}
